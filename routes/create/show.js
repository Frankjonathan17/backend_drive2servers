const showsModel = require('../../Schemas/Shows');
const router = require('express').Router()

router.post('/', async(req,res)=>{
  
    try{
        let {tmdb_id,imdb_id} = req.body
        let allowed = true
        if(imdb_id.length!==0){
            let m = await showsModel.find({imdb_id})
            if(m.length!==0) allowed = false
        }
         else{
          if(tmdb_id.length!==0){
            let m = await showsModel.find({tmdb_id})
            if(m.length!==0) allowed = false  
          }
         }
         
         if(allowed ===false){
          let m = `Alredy uploaded with imdb_id:${imdb_id} ,tmdb_id:${tmdb_id} `
          return res.json({failed:true,message:m}).status(401)
         }
        let Create  =  new showsModel(req.body)
        await Create.save()
        return res.json({failed:false,message:"REQUEST IS SUCCESSFULLY!",Create})
   }
   catch(er){
    return res.json({error:er,failed:true,message:'express server imeshindwa hifadhi!'}).status(500)
   }
      
 })
 module.exports = router;