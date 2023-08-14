const episodesModel = require('../../Schemas/episodes');
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

 correct ={...correct,dp:{data:'',contentType:'',originalFilename:''}}
  correct.dp.data = fs.readFileSync(files.dp.filepath)
  correct.dp.contentType=files.dp.mimetype
  correct.dp.originalFilename=files.dp.originalFilename
}
if(files.cover){
    correct ={...correct,cover:{data:'',contentType:'',originalFilename:''}}
     correct.cover.data = fs.readFileSync(files.cover.filepath)
     correct.cover.contentType=files.cover.mimetype
     correct.cover.originalFilename=files.cover.originalFilename
   }

        
            const makeSave = async()=>{
                 try{
                    let toSave =  new episodesModel(correct)
                     await toSave.save();
                    return res.json({failed:false,message:"REQUEST IS SUCCESSFULLY",toSave})
                 }
                 catch(er){
                  return res.json({failed:true,error:er,message:'express server imeshindwa hifadhi toSave!'})
                 }
            }
 
             makeSave();
      })
 
 })

module.exports = router;