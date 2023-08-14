const historiesModel = require('../../Schemas/histories');
const router = require('express').Router()

router.post('/', async(req,res)=>{
    try{    
      let {body} = req
      let results =[]
      const userId = body.userId;
      const type = body.type;
      
     results =  await historiesModel.aggregate([
      { $match: { "user._id": userId, type: type} },
      {
        $group: {
          _id: { type: "$type", _id: "$user._id" },
          count: { $sum: 1 },
          doc: { $first: "$$ROOT" }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ])

        return res.json({failed:false,results})
   }
   catch(er){
    return res.json({error:er,failed:true,message:'express server imepata hitilafu!'}).status(500)
   }
      
 })

module.exports = router;