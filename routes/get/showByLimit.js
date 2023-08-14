const showsModel = require('../../Schemas/Shows');
const router = require('express').Router()


router.post('/', async(req,res)=>{

  const body = req.body
  
    try{
       let results = []

       if(body.skip===undefined){
        results  = await  showsModel.find()
        .sort({created:-1})
       }
       else{
        results  = await  showsModel.find().sort({created:-1}).skip(body.skip).limit(body.limit)
       }
        
        return res.json({results})
   }
   catch(er){
    return res.json({error:er,message:'express server imeshindwa hifadhi!'}).status(500)
   }
      
 })

module.exports = router;