const userModel = require('../../Schemas/user');
const router = require('express').Router()

router.post('/', async(req,res)=>{
    
    try{
          await  userModel.updateOne({_id:req.body._id},{
          $set:req.body //badili 
      })
       let user = await  userModel.findById(req.body._id)
       user.dp =undefined
       user.cover = undefined
       user.password = undefined
       user.key=undefined
        return res.json({message:'updated',results:user,failed:false})
   }
   catch(er){
    return res.json({error:er,message:'express server imeshindwa hifadhi!'}).status(500)
   }
      
 })

module.exports = router;
