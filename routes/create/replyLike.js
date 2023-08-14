

const router = require('express').Router()
const replyModel = require('../../Schemas/replies')

router.post('/', async(req,res)=>{
    try{
      let Create = await replyModel.find({_id:req.body._id})
      Create = Create[0]
      let found = false
      for(let j = 0; j< Create.likes.length;j++){
        if(Create.likes[j]._id === req.body.profile._id) found = true
      }
   if(found){
      Create.likes = Create.likes.filter(l=>l._id !== req.body.profile._id) 
   }
   else{
      Create.likes=[...Create.likes,req.body.profile]
   }
      Create.dislikes = Create.dislikes.filter(d=>d._id !== req.body.profile._id)
      await Create.save()
      return res.json(Create)
     
   }
   catch(er){
    return res.json({error:er,message:'express server imepata hitilafu!'}).status(500)
   }
      
 })

module.exports = router;