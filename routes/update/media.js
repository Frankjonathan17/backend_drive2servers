
const router = require('express').Router()
const moviesModel = require('../../Schemas/movies');
const tvModel = require('../../Schemas/tv');
const showsModel = require('../../Schemas/Shows');
const episodesModel = require('../../Schemas/episodes');


router.post('/', async(req,res)=>{
  
    try{
        
    let kind = req.body.type
    let results = ''

    if(kind === 'movie'){
        results = await moviesModel.updateOne({_id:req.body._id},{
            $set:req.body
        })
    }
    if(kind === 'show'){
        results = await showsModel.updateOne({_id:req.body._id},{
            $set:req.body
        })
    }

    if(kind ==='tv'){
        results = await tvModel.updateOne({_id:req.body._id},{
            $set:req.body
        })
    }

    if(kind === 'episode'){       
       results = await episodesModel.updateOne({_id:req.body._id},{
        $set:req.body
    })
    }

    return res.json({failed:false, results})

   }
   catch(er){
    return res.json({error:er,message:'express server imeshindwa hifadhi!'}).status(500)
   }
      
 })

module.exports = router;