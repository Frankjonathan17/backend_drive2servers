const recommendsModel = require('../../Schemas/recommends');
const router = require('express').Router()


router.post('/', async(req,res)=>{

  const body = req.body
    try{
       let results = []

       if(body.skip===undefined){
        results  = await  recommendsModel.find({...req.body.filters})
        .populate({ path: 'user'})
        .sort({created:-1})
       }
       else{
        results  = await  recommendsModel.find({...req.body.filters}).populate({ path: 'user'}).sort({created:-1}).skip(body.skip).limit(body.limit)
       }
        
        return res.json({failed:false,results})
   }
   catch(er){
    return res.json({failed:true,error:er,message:'express server imeshindwa hifadhi!'}).status(500)
   }
      
 })

module.exports = router;