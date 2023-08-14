const express = require('express');
const router = express.Router();
const adminModel = require('../../Schemas/admin');


router.get('/', async(req,res)=>{
          try{
            let user =  await adminModel.find();

            const sending =async(us)=>{
               try{
                let gooduser = user[0]
                if(us !==undefined) gooduser = us
                gooduser.password=undefined;
                gooduser.key=undefined;
                gooduser.photo=undefined;
                gooduser.videophoto=undefined;
                gooduser.dp=undefined;
               return res.json(gooduser)
               }
               catch(er){
                return res.json({message:"something went wrong!"}).status(500)
               }
            }
            
                if(user.length!==0){
                  sending()
                }
                else{
                    let u =  new adminModel({firstname:'admin',lastname:'admin',password:"admin123"})
                     let us = await u.save()
                     sending(us)
                }
             

            }
            catch(er){
                 res.json({er})
            }
            
})


module.exports = router