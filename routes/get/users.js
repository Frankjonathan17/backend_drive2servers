const userModel = require('../../Schemas/user');
const router = require('express').Router()


router.post('/', async(req,res)=>{
    
    try{
        let results  = await userModel.find()
        .sort({created:-1})
       .select("_id firstName lastName created from name email vip payments hasDp hasCover country verified bio from genres services gender")
        // .selectedExclusively('dp cover')
        return res.json({results})
   }
   catch(er){
    return res.json({error:er,message:'express server imeshindwa hifadhi!'}).status(500)
   }
      
 })

module.exports = router;