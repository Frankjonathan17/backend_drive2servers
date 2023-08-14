const historiesModel = require('../../Schemas/histories');
const router = require('express').Router()

router.post('/', async(req,res)=>{
    try{    
      
        let obj = {}

        if(req.body._id!==undefined){
         obj = {"user._id":req?.body?._id}
        }

        if(req.body.filters !== undefined)  obj = req.body.filters
        let results  = []

        if(req.body.limit !== undefined){
            results = await historiesModel.find(obj)
            .limit(Number(req.body.limit))
            .sort({created:-1})
        }
        if(req.body.count!==undefined){
          results = await historiesModel.find(obj).count()
          return res.json({results})
        }

        if(req.body.count === undefined && req.body.limit === undefined){
          results =  await historiesModel.find(obj)
         .sort({created:-1})
        }

        return res.json({results})
   }
   catch(er){
    return res.json({error:er,message:'express server imepata hitilafu!'}).status(500)
   }
      
 })

module.exports = router;