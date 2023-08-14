const episodesModel = require('../../Schemas/episodes');
const router = require('express').Router()


router.post('/', async(req,res)=>{
    
    try{
        let results  = await episodesModel.find({ref:req.body._id})
        .sort({episode_number:1})
        return res.json({results})
   }
   catch(er){
    return res.json({error:er,message:'express server  inahitilafu!'}).status(500)
   }
      
 })

module.exports = router;