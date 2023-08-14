const previewsModel = require('../../Schemas/previews');
const router = require('express').Router()

router.post('/', async(req,res)=>{
    try{    
      let filters = req?.body?.filters
        let results  =[]

        if(req?.body?.count !== undefined){
         results  = await previewsModel.find({...filters})
          .count()
        }
        else if(req?.body?.limit !==undefined && req.body.skip !== undefined){
          results  = await previewsModel.find({...filters})
          .skip(req.body.skip)
          .limit(req.body.limit)
          .sort({created:-1})
        }

        else if(req?.body?.limit !==undefined){
          results  = await previewsModel.find({...filters})
          .limit(req.body.limit)
          .sort({created:-1})
        }

        else{
        if(req.body.filters === undefined){
          results  = await previewsModel.find()
        }
        else{
          results  = await previewsModel.find({...filters})
        }
        }

        return res.json({results})
   }
   catch(er){
    return res.json({error:er,message:'express server imepata hitilafu!'}).status(500)
   }
      
 })

module.exports = router;