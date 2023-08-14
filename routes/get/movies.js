const moviesModel = require('../../Schemas/movies');
const router = require('express').Router()


router.post('/', async(req,res)=>{

  const body = req.body
  
    try{
       let results = []
       if(body.skip===undefined){
        results  = await  moviesModel.find(req.body)
        .sort({created:-1})
       }
       else{
         if(body.uncategorized !==undefined){
          if(body.uncategorized === "false"){
           if(body.skip!==undefined){
            results  = await  moviesModel.find({uncategorized:"false"}).sort({created:-1}).skip(body.skip).limit(body.limit)
           }
           else{
            results  = await  moviesModel.find({uncategorized:"false"}).sort({created:-1})
           }
           
          }
          else{
            if(body.skip!==undefined){
              results  = await  moviesModel.find({uncategorized:"true"}).sort({created:-1}).skip(body.skip).limit(body.limit)
             }
             else{
              results  = await  moviesModel.find({uncategorized:"true"}).sort({created:-1})
             }
            
          }
         }
         else{
          results  = await  moviesModel.find({uncategorized:"false"}).sort({created:-1}).skip(body.skip).limit(body.limit)
        
         }
       }

        let toSend = results
        // if(results.length !== 0){
        //   for(let i = 0; i < results.length; i++){
        //      if(results[i].uncategorized !== undefined){
        //        if(results[i].uncategorized === 'false'){
        //          toSend = [...toSend,results[i]]
        //        }
        //      }
        //      else{
        //       toSend = [...toSend,results[i]]
        //      }
        //   }
        // }
        
        return res.json({results:toSend})
   }
   catch(er){
    return res.json({error:er,message:'express server imeshindwa hifadhi!'}).status(500)
   }
      
 })

module.exports = router;