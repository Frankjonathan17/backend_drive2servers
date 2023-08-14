const userModel = require('../../Schemas/user');
const router = require('express').Router()

router.post('/', async(req,res)=>{
    
    try{
    let userAvailable =  [];
    if(req.body.authType==='email'){
       userAvailable =  await userModel.find({email:req.body.email})
    }
    else{
       userAvailable =  await userModel.find({phone:req.body.phoneNumber})
    }

  if(userAvailable.length===0) return res.json({failed:true,message:'Account not registered'});

let matching = userAvailable[0].password===req.body.password
  let ux = userAvailable[0]
  ux.cover = undefined
  ux.password = undefined
  ux.dp = undefined
  ux.key =undefined
  
  if(matching===false) return res.json({failed:true,message:'Incorrect password'})
      
    return res.json({failed:false,results:ux})
   }
   
   catch(er){
    return res.json({error:er,failed:true,message:'express server imepata hitilafu!'}).status(500)
   }
      
 })

module.exports = router;