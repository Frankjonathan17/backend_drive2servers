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
           let subs = cur.subscribers
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
                $set:{subscribers:correct}//badili 
                 })
             //   badili na user list
             if(user.moviesFollowing ===undefined) user.moviesFollowing = []
               user.moviesFollowing = user.moviesFollowing.filter(m=>m._id !== media._id)
               await  UserModel.updateOne({_id:user._id},{
                $set:{moviesFollowing:user.moviesFollowing}//badili 
                 })
                
      
           }else{
               correct = [...subs,user]
               results = correct
               //   badili movie kwanza
                await  moviesModel.updateOne({_id:cur._id},{
                  $set:{subscribers:correct}//badili 
                   })
               //   badili na user list
               if(user.moviesFollowing ===undefined) user.moviesFollowing = []
                 user.moviesFollowing = [media,...user.moviesFollowing]
                 await  UserModel.updateOne({_id:user._id},{
                  $set:{moviesFollowing:user.moviesFollowing}//badili 
                   })
           }
           
          }
        //   kama ni tv sasa
          else{

            let cur = await showsModel.findById(media?._id)
            let subs = cur.subscribers
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
                 $set:{subscribers:correct}//badili 
                  })
              //   badili na user list
              if(user.showsFollowing ===undefined) user.showsFollowing = []
                user.showsFollowing = user.showsFollowing.filter(m=>m._id !== media._id)
                await  UserModel.updateOne({_id:user._id},{
                 $set:{showsFollowing:user.showsFollowing}//badili 
                  })
                 
       
            }else{
                correct = [...subs,user]
                results = correct
                //   badili movie kwanza
                 await  showsModel.updateOne({_id:cur._id},{
                   $set:{subscribers:correct}//badili 
                    })
                //   badili na user list
                if(user.showsFollowing ===undefined) user.showsFollowing = []
                  user.showsFollowing = [media,...user.showsFollowing]
                  await  UserModel.updateOne({_id:user._id},{
                   $set:{showsFollowing:user.showsFollowing}//badili 
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
