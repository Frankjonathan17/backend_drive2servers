const PlaylistsModel = require('../../Schemas/playlists');
const router = require('express').Router()

router.post('/', async(req,res)=>{
    try{
         await   PlaylistsModel.updateOne({_id:req.body._id},{
          $set:{...req.body} //badili text za io comment
      })
        return res.json({message:'Updated',failed:false})
   }
   catch(er){
    return res.json({error:er,message:'express server imeshindwa hifadhi!'}).status(500)
   }
      
 })

module.exports = router;