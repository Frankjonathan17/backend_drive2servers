const PlaylistsModel = require('../../Schemas/playlists');
const router = require('express').Router()

router.post('/', async(req,res)=>{
    try{    
      let filters = req?.body?.filters
        let results  =[]

        if(req?.body?.count !== undefined){
         results  = await PlaylistsModel.find({...filters})
          .count()
        }

  
        else if(req?.body?.limit !==undefined && req.body.skip !== undefined){
          results  = await PlaylistsModel.find({...filters})
          .skip(req.body.skip)
          .limit(req.body.limit)
          .sort({created:-1})
        }
        else if(req?.body?.limit !==undefined){
          results  = await PlaylistsModel.find({...filters})
          .limit(req.body.limit)
          .sort({created:-1})
        }
        else{
        if(req.body.filters === undefined){
          results  = await PlaylistsModel.find()
        }
        else{
          results  = await PlaylistsModel.find({...filters})
        }
        }

        return res.json({failed:false,results})
   }
   catch(er){
    return res.json({error:er,failed:true,message:'express server imepata hitilafu!'}).status(500)
   }
      
 })

module.exports = router;