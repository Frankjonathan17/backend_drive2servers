const episodesModel = require('../../Schemas/episodes');
const router = require('express').Router()


router.get('/', async(req,res)=>{
    
    try{

        let results  = await episodesModel.find()
        .sort({created:-1})
        return res.json({results})
   }
   catch(er){
    return res.json({error:er,message:'express server imeshindwa hifadhi!'}).status(500)
   }
      
 })

module.exports = router;