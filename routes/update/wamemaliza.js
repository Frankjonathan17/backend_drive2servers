const moviesModel = require('../../Schemas/movies');
const showsModel = require('../../Schemas/Shows');
const UserModel = require('../../Schemas/user');
const router = require('express').Router()

router.post('/', async(req,res)=>{
    
    try{
          const {type,user,media} = req?.body
          let results = []

          if(type ==='movie'){
           let cur = await moviesModel.findById(media?._id)
           let subs = []
           if(cur.completed === undefined) cur.completed = []
           subs = cur.completed
           let correct = []
           let found = false
           if(subs.length !==0){
             for(let i = 0; i<subs.length;i++){
                if(subs[i]._id === user._id){
                    found = true
                }
             }
           }
      
           if(found){
              correct = subs.filter(s=>s._id !== user._id)
             //   badili movie kwanza
             results = correct
              await  moviesModel.updateOne({_id:cur._id},{
                $set:{completed:correct}//badili 
                 })
             //   badili na user list
             if(user.moviesCompleted ===undefined) user.moviesCompleted = []
               user.moviesCompleted = user.moviesCompleted.filter(m=>m._id !== media._id)
               await  UserModel.updateOne({_id:user._id},{
                $set:{moviesCompleted:user.moviesCompleted}//badili 
                 })
                
      
           }else{
               correct = [...subs,user]
               results = correct
               //   badili movie kwanza
                await  moviesModel.updateOne({_id:cur._id},{
                  $set:{completed:correct}//badili 
                   })
               //   badili na user list
               if(user.moviesCompleted ===undefined) user.moviesCompleted = []
                 user.moviesCompleted = [{...media,added:new Date().toJSON()},...user.moviesCompleted]
                 await  UserModel.updateOne({_id:user._id},{
                  $set:{moviesCompleted:user.moviesCompleted}//badili 
                   })
           }
           
          }
        //   kama ni tv sasa
          else{

            let cur = await showsModel.findById(media?._id)
            let subs = []
            if(cur.completed === undefined) cur.completed = []
            subs = cur.completed
            let correct = []
            let found = false
            if(subs.length !==0){
              for(let i = 0; i<subs.length;i++){
                 if(subs[i]._id === user._id){
                     found = true
                 }
              }
            }
       
            if(found){
               correct = subs.filter(s=>s._id !== user._id)
               results = correct
              //   badili movie kwanza
               await  showsModel.updateOne({_id:cur._id},{
                 $set:{completed:correct}//badili 
                  })
              //   badili na user list
              if(user.showsCompleted ===undefined) user.showsCompleted = []
                user.showsCompleted = user.showsCompleted.filter(m=>m._id !== media._id)
                await  UserModel.updateOne({_id:user._id},{
                 $set:{showsCompleted:user.showsCompleted}//badili 
                  })
                 
       
            }else{
                correct = [...subs,user]
                results = correct
                //   badili movie kwanza
                 await  showsModel.updateOne({_id:cur._id},{
                   $set:{completed:correct}//badili 
                    })
                //   badili na user list
                if(user.showsCompleted ===undefined) user.showsCompleted = []
                  user.showsCompleted = [{...media,added:new Date().toJSON()},...user.showsCompleted]
                  await  UserModel.updateOne({_id:user._id},{
                   $set:{showsCompleted:user.showsCompleted}//badili 
                    })
            }
            

          }
         

        return res.json({message:'updated',results,failed:false})
   }
   catch(er){
    return res.json({error:er,message:'express server imepata hitiliafu!'}).status(500)
   }
      
 })

module.exports = router;
