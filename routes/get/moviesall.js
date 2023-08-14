const moviesModel = require('../../Schemas/movies');
const router = require('express').Router()


router.post('/', async(req,res)=>{
  
    try{
      const body = req.body
        let results =[]
          if(body.skip !== undefined){
           if(body.filters !==undefined){
            results  = await  moviesModel.find(body.filter).sort({created:-1}).skip(body.skip).limit(body.limit)
           }
           else{
            results  = await  moviesModel.find().sort({created:-1}).skip(body.skip).limit(body.limit)
           }
                
          }
          else{
             if(body!==undefined){
                  if(body.uncategorized!==undefined){
                           
                                  if(body.filters!==undefined){
                                    results  = await  moviesModel.find(body.filters)
                                   .sort({created:-1})
                                 }
                                 else{
                                    results  = await  moviesModel.find()
                                   .sort({created:-1})
                                 } 
                                
                  }else{
                    if(body.filters!==undefined){
                      results  = await  moviesModel.find(body.filters)
                     .sort({created:-1})
                   }
                   else{
                      results  = await  moviesModel.find()
                     .sort({created:-1})
                   }
                  }
             }
             else{
        
               results  = await  moviesModel.find()
              .sort({created:-1})
            
             }
          }
        
        return res.json({results})
   }
   catch(er){
    return res.json({error:er,message:'express server imeshindwa hifadhi!'}).status(500)
   }
      
 })

module.exports = router;