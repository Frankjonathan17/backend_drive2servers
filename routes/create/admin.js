const express = require('express');
const router = express.Router();
const adminModel = require('../../Schemas/admin');


router.post('/', async(req,res)=>{
    
     let user = new UserModel(req.body);
     const isRegistered = await adminModel.findOne({email:req.body.email }) 
      if(isRegistered){
           res.json({error:'The email is already in use',message:'email is already registered'})
           return null;
      }
      else{
          try{
               let result = await user.save()
                 res.json({profile:result,redirect:true,message:'Account Created Successfully'});
            }
            catch(er){
                 res.json({er})
            }
             
      }

})


module.exports = router