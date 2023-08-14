const moviesModel = require('../../Schemas/movies');
const router = require('express').Router()


router.post('/', async(req,res)=>{
  
    try{
        let results = 0
        const body= req.body
        if(body.type === 'tv'){
            results  = await  moviesModel.find().count()
        }
        else{
           if(body.uncategorized !==undefined){
               if(body.uncategorized === false){
                results  = await  moviesModel.find({uncategorized:'false'}).count()
               }
               else{
                results  = await  moviesModel.find().count()
               }
           }
           else{
            results  = await  moviesModel.find().count()
           }
        }
       
        return res.json({results})
   }
   catch(er){
    return res.json({error:er,message:'express server imeshindwa hifadhi!'}).status(500)
   }
      
 })

module.exports = router;