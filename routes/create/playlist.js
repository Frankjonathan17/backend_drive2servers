
const PlaylistsModel = require('../../Schemas/playlists');
const router = require('express').Router()

router.post('/', async(req,res)=>{
    
    try{
        let results  =  new PlaylistsModel(req.body)
        await results.save()
        return res.json({failed:false,message:'Imetengenezwa kikamilifu',results})

   }
   catch(er){
    return res.json({error:er,failed:true,message:'express server imepata hitilafu!'}).status(500)
   }
      
 })

module.exports = router;