
const router = require('express').Router()
const moviesModel = require('../../Schemas/movies');
const tvModel = require('../../Schemas/tv');
const episodesModel = require('../../Schemas/episodes');


router.post('/', async(req,res)=>{
  
    try{
        
    let kind = req.body.type
    let body = req.body
    let results = ''
    let user = req.body.user

    if(kind === 'movie'){
let  media =  await moviesModel.findById(req.body._id)
let found = false
for(let j = 0; j<media.likes.length;j++){
  if(media.likes[j]._id === user._id) found = true
}
if(found){
media.likes =media.likes.filter(l=>l._id !== user._id) 
}
else{
media.likes=[...media.likes,user]
}
media.dislikes =media.dislikes.filter(l=>l._id !== user._id)

        results = await moviesModel.updateOne({_id:req.body._id},{
            $set:media
        })
    }

    if(kind ==='tv'){
      
    }

    if(kind === 'episode'){

let  media =  await episodesModel.findById(req.body._id)
let found = false
for(let j = 0; j<media.likes.length;j++){
  if(media.likes[j]._id === user._id) found = true
}
if(found){
media.likes =media.likes.filter(l=>l._id !== user._id) 
}
else{
media.likes=[...media.likes,user]
}
media.dislikes =media.dislikes.filter(l=>l._id !== user._id)

        results = await episodesModel.updateOne({_id:req.body._id},{
            $set:media
        })
    }

    return res.json({failed:false, results})

   }
   catch(er){
    return res.json({error:er,message:'express server imeshindwa hifadhi!'}).status(500)
   }
      
 })

module.exports = router;