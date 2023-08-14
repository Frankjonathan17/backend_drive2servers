const UserModel = require('../../Schemas/user');
const router = require('express').Router();

router.post('/', async (req, res) => {
    try {
        let results = [];
    
    if (req.body.users !== undefined) {
      results = await UserModel.find({
        _id: { $in: req.body.users }
      }).sort({ created: -1 });
    }
      return res.json({ failed: false, results});
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error, failed: true, message: 'Server error!' });
    }
  });
  
  module.exports = router