
const completedModel = require('../../Schemas/completed');
const router = require('express').Router()

router.post('/', async(req,res)=>{
    
    try{
        let results = await completedModel.find({...req.body.filters})
        .sort({created:-1})
        .populate('movie')
        .populate('show')
        return res.json({results})
   }
   catch(er){
    return res.json({error:er,message:'express server imepata hitilafu!'}).status(500)
   }
      
 })

module.exports = router;