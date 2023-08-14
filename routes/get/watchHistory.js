const watchHistoryModel = require('../../Schemas/watchhistory');
const router = require('express').Router()

router.post('/', async(req,res)=>{
    
    try{

        const found  = await watchHistoryModel.find({userId:req.body._id})
        .sort({created:-1})
        return res.json({found})
   }
   catch(er){
    return res.json({error:er,message:'express server imeshindwa hifadhi!'}).status(500)
   }
      
 })

module.exports = router;