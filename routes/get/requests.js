const RequestsModel = require('../../Schemas/requests');
const router = require('express').Router()

router.post('/', async(req,res)=>{

    try{
        let Create  = await RequestsModel.find().sort({created:-1})
        return res.json({results:Create})
   }

   catch(er){

    return res.json({error:er,message:'express server imeshindwa hifadhi!'}).status(500)

   }
      
 })

module.exports = router;