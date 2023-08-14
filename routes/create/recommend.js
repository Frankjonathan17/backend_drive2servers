
const episodesModel = require('../../Schemas/episodes');
const moviesModel = require('../../Schemas/movies');
const recommendsModel = require('../../Schemas/recommends');
const showsModel = require('../../Schemas/Shows');
const tvsModel = require('../../Schemas/tv');
const router = require('express').Router()


router.post('/', async(req,res)=>{
    
    try{
        let results  =  new recommendsModel(req.body)
        await results.save()

        if(req.body.type ==='movie'){
            let a = []
            if(req.body.media.recommends !== undefined){
                a = req.body.media.recommends
            }
              if(a.indexOf(req.body.user)!==-1){
                   a = a.filter(x=>x!==req.body.user)
              }
              else{
                a = [...a,req.body.user]
              }

          results = await moviesModel.updateOne({_id:req.body.media._id},{
                $set:{recommends:a}
            });
        }

        if(req.body.type ==='tv'){
            let a = []
            if(req.body.media.recommends !== undefined){
                a = req.body.media.recommends
            }
              if(a.indexOf(req.body.user)!==-1){
                   a = a.filter(x=>x!==req.body.user)
              }
              else{
                a = [...a,req.body.user]
              }

          results = await  tvsModel.updateOne({_id:req.body.media._id},{
                $set:{recommends:a}
            });
        }

        
        if(req.body.type ==='show'){
            let a = []
            if(req.body.media.recommends !== undefined){
                a = req.body.media.recommends
            }
              if(a.indexOf(req.body.user)!==-1){
                   a = a.filter(x=>x!==req.body.user)
              }
              else{
                a = [...a,req.body.user]
              }

          results = await  showsModel.updateOne({_id:req.body.media._id},{
                $set:{recommends:a}
            });
        }

        
        if(req.body.type ==='episode'){
            let a = []
            if(req.body.media.recommends !== undefined){
                a = req.body.media.recommends
            }
              if(a.indexOf(req.body.user)!==-1){
                   a = a.filter(x=>x!==req.body.user)
              }
              else{
                a = [...a,req.body.user]
              }

          results = await  episodesModel.updateOne({_id:req.body.media._id},{
                $set:{recommends:a}
            });
        }




        return res.json({failed:false,results})

   }
   catch(er){
    return res.json({failed:true,error:er,message:'express server imepata hitilafu!'}).status(500)
   }
      
 })

module.exports = router;