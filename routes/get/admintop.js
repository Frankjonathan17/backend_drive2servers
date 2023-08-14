const express = require('express');
const router = express.Router();
const adminModel = require('../../Schemas/admin');


router.get('/', async(req,res)=>{
          try{
            let user =  await adminModel.find();
            
                if(user.length!==0){
                    let gooduser = user[0]
                    gooduser.key=undefined;
                    gooduser.photo=undefined;
                    gooduser.videophoto=undefined;
                    gooduser.dp=undefined;
                   return res.json(gooduser)
                }
                else{
                   return res.json({message:'nothing saved'})
                }
             

            }
            catch(er){
                 res.json({er})
            }
            
})


module.exports = router