const VisitorModel = require('../../Schemas/visitor');
const router = require('express').Router()

router.post('/', async(req,res)=>{
    
    try{

      let results =  new VisitorModel(req.body)
      await results.save()
      
      return res.json({results,failed:false})
   }
   catch(er){
    return res.json({error:er,failed:true,message:'express server imeshindwa hifadhi!'}).status(500)
   }
      
 })

module.exports = router;