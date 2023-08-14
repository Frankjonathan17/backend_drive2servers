const historiesModel = require('../../Schemas/histories');
const router = require('express').Router()

router.post('/', async(req,res)=>{
    try{    
        let results  = historiesModel.find()
        .sort({created:-1})
        return res.json({results})
   }
   catch(er){
    return res.json({error:er,message:'express server imepata hitilafu!'}).status(500)
   }
      
 })

module.exports = router;