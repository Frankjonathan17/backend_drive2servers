const moviesModel = require('../../Schemas/movies');
const router = require('express').Router()


router.post('/', async(req,res)=>{
  
    try{
      const body = req.body
        let results  = []
        if(body.limit !==undefined){
          results  = await  moviesModel.find({uncategorized:"true"}).skip(body.skip).limit(body.limit)
          .sort({created:-1})
        }
        else{
          results  = await  moviesModel.find({uncategorized:"true"})
          .sort({created:-1})
        }
        
        return res.json({results})
   }
   catch(er){
    return res.json({error:er,message:'express server imeshindwa hifadhi!'}).status(500)
   }
      
 })

module.exports = router;