const moviesModel = require('../../Schemas/movies');
const router = require('express').Router()


router.post('/', async(req,res)=>{
  
    try{
        let results  = await  moviesModel.findById(req.body._id)
       
        return res.json({results})
   }
   catch(er){
    return res.json({error:er,message:'express server imeshindwa hifadhi!'}).status(500)
   }
      
 })

module.exports = router;