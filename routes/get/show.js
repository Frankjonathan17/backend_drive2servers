const showsModel = require('../../Schemas/Shows');
const router = require('express').Router()


router.post('/', async(req,res)=>{
    
    try{

        let results  = await  showsModel.findById(req.body._id)
        return res.json({results})
   }
   catch(er){
    return res.json({error:er,message:'express server imepata hitilafu!'}).status(500)
   }
      
 })

module.exports = router;