const VisitorModel = require('../../Schemas/visitor');
const router = require('express').Router()


router.post('/', async(req,res)=>{
    
    try{
        let visitors =[] 
        
        if(req.body.count !== undefined){
          visitors = await VisitorModel.find()
          .count() 
        }
        else if(req.body.limit !==undefined && req.body.skip !== undefined){
          visitors = await VisitorModel.find()
          .skip(req.body.skip)
          .limit(req.body.limit)
          .sort({created:-1})
          .populate('user')
        
        }
        else if(req.body.limit !== undefined){
          visitors = await VisitorModel.find()
          .limit(req.body.limit)
          .sort({created:-1})
          .populate('user')
        
        }
        else{
          visitors = await VisitorModel.find()
         .sort({created:-1})
         .populate('user')
        
        }

      return res.send({results:visitors,failed:false})
   }
   catch(er){
    return res.json({error:er,failed:true,message:'express server imepata hitilafu'}).status(500)
   }
      
 })

module.exports = router;