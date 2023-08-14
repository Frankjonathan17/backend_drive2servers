const userModel = require('../../Schemas/user');
const router = require('express').Router()


router.post('/', async(req,res)=>{
    
    try{
        let Data  = {};
        if(req.body._id!==undefined){
         Data= await userModel.findOne({_id:req.body._id})
         
        }
        else{
          Data = await userModel.findOne({name:req.body.name})
          
        }

        if(Data._id === undefined) return res.json({failed:true,message:"user not found, may be deleted or blocked!"})
            Data.dp = undefined
            Data.cover = undefined
           if(req.body.yote === undefined){
            Data.password = undefined
           }
            Data.key = undefined
        return res.json({failed:false,results:Data})
   }
   catch(er){
    return res.json({failed:true,error:er,message:'express server imepata hitilifu!'}).status(500)
   }
      
 })

module.exports = router;