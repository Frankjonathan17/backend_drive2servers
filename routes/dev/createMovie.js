const movieModel = require('../../Schemas/movies');
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
if(correct.genres !== undefined){
     correct.genres = JSON.parse(correct.genres)
}
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
   correct.genres= JSON.parse(correct.genres)

//    return res.json({kwl:true})
   

        
            const makeSave = async()=>{
                 try{
                    let toSave = await new movieModel(correct)
                     await toSave.save()
                    return res.json(toSave)
                 }
                 catch(er){
                  return res.json({error:er,message:'express server imeshindwa hifadhi toSave!'})
                 }
            }
 
             makeSave();
      })
 
 })

module.exports = router;