const router = require('express').Router()
const ytdl = require('ytdl-core')

router.post('/', async(req,res)=>{
  
    try{
        const url = req.body.url
        // const videoId = await ytdl.getURLVideoID(url)
        const info = await ytdl.getInfo(url)
       
        return res.json({info})
   }
   catch(er){
    return res.json({error:er,message:'express server imeshindwa hifadhi!'}).status(500)
   }
      
 })

module.exports = router;