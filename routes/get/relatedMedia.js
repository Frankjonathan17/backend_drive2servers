
const router = require('express').Router()
const moviesModel = require('../../Schemas/movies');
const tvModel = require('../../Schemas/tv');
const episodesModel = require('../../Schemas/episodes');

router.post('/', async(req,res)=>{
  
    try{
        
    let kind = req.body.media.type
    let  media = req.body.media
    let filter = req.body.filter
    let results = []

    if(kind === 'movie'){
        results = await moviesModel.find(filter)
    }

    if(kind ==='tv'){
        results = await tvModel.find(filter)
    }

    if(kind === 'episode'){
        // results = await episodesModel.find({ref:req.body._id})
        // .sort({created:-1})
    }

    return res.json({failed:false, results})

   }
   catch(er){
    return res.json({error:er,message:'express server imeshindwa hifadhi!'}).status(500)
   }
      
 })

module.exports = router;