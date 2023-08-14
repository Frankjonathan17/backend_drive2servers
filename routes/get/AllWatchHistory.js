const watchHistoryModel = require('../../Schemas/watchhistory');
const router = require('express').Router()

router.get('/', async(req,res)=>{
    
    try{

        const found  = await watchHistoryModel.find()
        .sort({created:-1})
        await Create.save()
        return res.json(found)
   }
   catch(er){
    return res.json({error:er,message:'express server imeshindwa hifadhi!'}).status(500)
   }
      
 })

module.exports = router;