const replyModel = require('../../Schemas/replies');
const router = require('express').Router();

router.post('/', async (req, res) => {
  try {
    const replies = await replyModel.find({ base: req.body._id })
    .sort({created:-1})
     .populate('user')
      .populate('season')
      .populate('episode')
      .populate('show')
      .populate('movie')
      .exec();
    return res.json({ failed: false, results: replies });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error, failed: true, message: 'Server error!' });
  }
});

module.exports = router;
