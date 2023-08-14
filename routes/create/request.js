const RequestsModel = require('../../Schemas/requests');
const router = require('express').Router()


router.post('/', async(req,res)=>{
    
    try{
        let resutls  = new RequestsModel(req.body)
        await resutls.save()
        return res.json({resutls})
   }
   catch(er){
    return res.json({error:er,message:'express server imeshindwa hifadhi!'}).status(500)
   }
      
 })

module.exports = router;