const commentsModel = require('../../Schemas/comments');
const replyModel = require('../../Schemas/replies');
const router = require('express').Router();

router.post('/', async (req, res) => {
  try {
    const results = await commentsModel.find({user:req.body._id})
    .populate('user')
    .populate('show')
    .populate('episode')
    .populate('season')
    .populate('movie')
    .exec()

    return res.json({failed:false,results})

  }
  catch(er){
    return res.status(500).json({ error, failed: true, message: 'Server error!' });
  }
});

module.exports = router;
