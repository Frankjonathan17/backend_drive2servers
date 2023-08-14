const commentsModel = require('../../Schemas/comments');
const router = require('express').Router();

router.post('/', async (req, res) => {
  try {
    
    let results = []
if(req.body.count !== undefined){
  results = await commentsModel.find({...req.body.filters})
  .count()
}else{
  if(req.body.limit === undefined){
    results = await commentsModel.find({...req.body.filters})
  .populate('user')
  .populate('show')
  .populate('episode')
  .populate('movie')
  .populate('season')
  .exec()
  }
  else{
   results = await commentsModel.find({...req.body.filters})
   .sort({created:-1})
  .limit(req.body.limit)
  .populate('user')
  .populate('show')
  .populate('episode')
  .populate('movie')
  .populate('season')
  .exec()

  }
  
}

    return res.json({failed:false,results})

  }
  catch(er){
    return res.status(500).json({ error, failed: true, message: 'Server error!' });
  }
});

module.exports = router;
