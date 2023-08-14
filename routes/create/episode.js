const tvsModel = require('../../Schemas/tv');
const episodesModel = require('../../Schemas/episodes')
const router = require('express').Router()


router.post('/', async(req,res)=>{
    try{
       let base = await tvsModel.find({_id:req.body.ref})
       let ALLEPS = await episodesModel.find({ref:req.body.ref})
       
       if(base.length ===0){
        return res.json({failed:true,message:"Parent or base Tv show not available!"})
       }

       let message = "Episode with specified video link is alredy exist!"
       if(ALLEPS.length !==0){
        let available = false
        for(let i = 0; i<ALLEPS.length;i++){
          if(ALLEPS[i].key ===req.body.key){
            available = true
          }
          if(ALLEPS[i].episode_number ===req.body.episode_number){
            available = true
            message =`Episode number ${req.body.episode_number} is already exist!`
          }
        }

        if(available){
          return res.json({failed:true,message});
        }
       }

        let episode  =  new episodesModel(req.body)
        await episode.save()
        return res.json({failed:false,message:"REQUEST IS SUCCESSFULLY",newUpdate})
  
      }
   catch(er){
    return res.json({error:er,message:'express server imeshindwa hifadhi!'}).status(500)
   }
      
 })

module.exports = router;