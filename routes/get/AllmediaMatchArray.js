const episodesModel = require('../../Schemas/episodes');
const moviesModel = require('../../Schemas/movies');
const showsModel = require('../../Schemas/Shows');
const router = require('express').Router();

router.post('/', async (req, res) => {
    try {
        let results = [];
        let resultEp = [];
        let resultSh = [];

    if (req.body.movies !== undefined) {
      results = await moviesModel.find({
        _id: { $in: req.body.movies }
      }).sort({ created: -1 });
    }
    
    if (req.body.shows !== undefined) {
      resultSh = await showsModel.find({
        _id: { $in: req.body.shows }
      }).sort({ created: -1 });
    }
    
    if (req.body.episodes !== undefined) {
      resultEp = await episodesModel.find({
        _id: { $in: req.body.episodes }
      }).sort({ created: -1 });
    }
    
    let allRes = [...results, ...resultEp, ...resultSh];
      return res.json({ failed: false, results: allRes });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error, failed: true, message: 'Server error!' });
    }
  });
  
  module.exports = router