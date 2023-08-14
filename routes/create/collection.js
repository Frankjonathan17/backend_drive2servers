
const collectionsModel = require('../../Schemas/collections');
const router = require('express').Router()


router.post('/', async(req,res)=>{
    
    try{

        let Create  = await new collectionsModel(req.body)
        await Create.save()
        return res.json(Create)
   }
   catch(er){
    return res.json({error:er,message:'express server imeshindwa hifadhi!'}).status(500)
   }
      
 })

module.exports = router;