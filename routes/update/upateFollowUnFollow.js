const userModel = require('../../Schemas/user');
const router = require('express').Router()

router.post('/', async(req,res)=>{
    
    try{
        const me = await userModel.find({_id:req.body.me})
        const other = await userModel.find({_id:req.body.other})
 
      if(me.length!==0){
        let m = me[0]
        let ar = m.following
        if(ar.indexOf(req.body.other) !== -1){
            ar = ar.filter(r=>r!== req.body.other)
        }
        else{
            ar = [req.body.other,...ar]
        }
        await  userModel.updateOne({_id:m._id},{
            $set:{following:ar} //badili 
        })
      }
       

      if(other.length!==0){
        let o = other[0]
        let ar = o.followers
        if(ar.indexOf(req.body.me) !== -1){
            ar = ar.filter(r=>r!== req.body.me)
        }
        else{
            ar = [req.body.me,...ar]
        }
        await  userModel.updateOne({_id:o._id},{
            $set:{followers:ar} //badili 
        })
      }

        return res.json({message:'updated',results:'updated',failed:false})
   }
   catch(er){
    return res.json({error:er,message:'express server imeshindwa hifadhi!'}).status(500)
   }
      
 })

module.exports = router;
