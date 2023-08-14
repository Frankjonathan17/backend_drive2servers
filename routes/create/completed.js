
const completedModel = require('../../Schemas/completed');
const router = require('express').Router()

router.post('/', async(req,res)=>{
    
    try{
        let results = new completedModel(req.body)
        await results.save();
        return res.json({results})
   }
   catch(er){
    return res.json({error:er,message:'express server imepata hitilafu!'}).status(500)
   }
      
 })

module.exports = router;