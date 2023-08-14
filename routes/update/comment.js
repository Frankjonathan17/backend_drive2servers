
const commentsModel = require('../../Schemas/comments');
const router = require('express').Router()

router.post('/', async(req,res)=>{
    
    try{
         await  commentsModel.updateOne({_id:req.body._id},{
          $set:{text:req.body.text} //badili text za io comment
      })
        return res.json({message:'updated',failed:false})
   }
   catch(er){
    return res.json({error:er,message:'express server imeshindwa hifadhi!'}).status(500)
   }
      
 })

module.exports = router;