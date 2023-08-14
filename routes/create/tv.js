const tvModel = require('../../Schemas/tv');
const router = require('express').Router()


router.post('/', async(req,res)=>{
    
    try{    
        let Create  = new tvModel(req.body)
        await Create.save()
        return res.json(Create)
   }
   catch(er){
    return res.json({error:er,message:'express server imeshindwa hifadhi!'}).status(500)
   }
      
 })

module.exports = router;