const tvModel = require('../../Schemas/tv');
const router = require('express').Router()


router.post('/', async(req,res)=>{
    
    try{

        let results  = await  tvModel.find()
        .sort({created:-1})

        //let toSend = []
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
        
        return res.json({results})
   }
   catch(er){
    return res.json({error:er,message:'express server imeshindwa hifadhi!'}).status(500)
   }
      
 })

module.exports = router;