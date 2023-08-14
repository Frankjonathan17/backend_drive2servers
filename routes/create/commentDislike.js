
const commentsModel = require('../../Schemas/comments');
const router = require('express').Router()


router.post('/', async(req,res)=>{
    
    try{

        let Create = await commentsModel.find({_id:req.body._id})
        Create = Create[0]
        let found = false
        for(let j = 0; j< Create.dislikes.length;j++){
          if(Create.dislikes[j]._id === req.body.profile._id) found = true
        }
     if(found){
        Create.dislikes = Create.dislikes.filter(l=>l._id !== req.body.profile._id) 
     }
     else{
        Create.dislikes=[...Create.dislikes,req.body.profile]
     }
        Create.likes = Create.likes.filter(d=>d._id !== req.body.profile._id)
        await Create.save()
        return res.json(Create)
   }
   catch(er){
    return res.json({error:er,message:'express server imeshindwa hifadhi!'}).status(500)
   }
      
 })

module.exports = router;