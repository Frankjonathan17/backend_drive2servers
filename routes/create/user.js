const userModel = require('../../Schemas/user');
const router = require('express').Router()
const formidable = require('formidable');
const fs = require('fs');


router.post('/', async(req,res)=>{

     let form = new formidable.IncomingForm();
      form.keepExtensions=true;
      
      form.parse(req,(err,fields,files)=>{
            if(err){
                return res.status(400).json({
                     error:err,message:'fomu imeifeli kwenye kuhifadhi,'
                })
      }      

let correct ={...fields}

if(files.dp){

  correct ={...correct,hasDp:true}
  correct ={...correct,dp:{data:'',contentType:'',originalFilename:''}}
  correct.dp.data = fs.readFileSync(files.dp.filepath)
  correct.dp.contentType=files.dp.mimetype
  correct.dp.originalFilename=files.dp.originalFilename

}

if(files.cover){
     correct ={...correct,hasCover:true}
     correct ={...correct,cover:{data:'',contentType:'',originalFilename:''}}
     correct.cover.data = fs.readFileSync(files.cover.filepath)
     correct.cover.contentType=files.cover.mimetype
     correct.cover.originalFilename=files.cover.originalFilename
   
}

        
            const makeSave = async()=>{
                 try{

                  let userAvailableName =  await userModel.find({name:correct.name})
                  if(userAvailableName.length!==0) return res.json({failed:true,message:'Username already in use'});
                  let userAvailable =  await userModel.find({email:correct.email})
                  if(userAvailable.length!==0) return res.json({failed:true,message:'Email already in use'});
 
                     let toSave =  new userModel(correct)
                     await toSave.save()
                     let results = toSave
                     results.dp = undefined
                     results.cover = undefined
                     results.password = undefined
                     results.key = undefined
                     return res.json({failed:false,results})
                 }
                 catch(er){
                  return res.json({failed:true,error:er,message:'express server imepata hitilafu!'})
                 }
            }
 
             makeSave();
      })
 
 })

module.exports = router;
