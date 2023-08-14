
const commentsModel = require('../../Schemas/comments');
const router = require('express').Router()

router.post('/', async(req,res)=>{
    
    try{
    
     let comm = await commentsModel.find({_id:req.body._id})
     if(comm.length===0) return res.json({failed:true,message:"not found"})
       let com = comm[0]
       let tear = []
        
          for(let i = 0;i<com.replies.length;i++){
            let r = com.replies[i]
            if(r._id === req.body.reply._id){
                r.text = req.body.text
            }
            tear  = [...tear,r]
          }
          
       
     await  commentsModel.updateOne({_id:req.body._id},{
          $set:{replies:tear} //badili text za io comment
      });
        return res.json({failed:false,message:"updated"})
   }
   catch(er){
    return res.json({error:er,message:'express server imeshindwa hifadhi!'}).status(500)
   }
      
 })

module.exports = router;