
const router = require('express').Router()
const replyModel = require('../../Schemas/replies')

router.post('/', async(req,res)=>{
    try{

        let results = new replyModel(req.body)
        await results.save()
        return res.json({results,failed:false})
   }
   catch(er){
    return res.json({error:er,failed:true,message:'express server imepata hitilafu!'}).status(500)
   }
      
 })

module.exports = router;