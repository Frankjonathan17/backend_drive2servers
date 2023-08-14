const commentsModel = require('../../Schemas/comments');
const replyModel = require('../../Schemas/replies');
const router = require('express').Router();

router.post('/', async (req, res) => {
  try {
    const results = await commentsModel.aggregate([
      // First stage: find the comments that match the query
      {
        $match: { base: req.body._id }
      },
      // Second stage: perform a left outer join with the replies collection
      {
        $lookup: {
          from: 'replies',
          localField: '_id',
          foreignField: 'base',
          as: 'replies'
        }
      },
      // Third stage: project the document to include the count of the replies array and add a new property count to the replies object
      {
        $project: {
          _id: 1,
          base: 1,
          text: 1,
          created: 1,
          user: 1,
          season: 1,
          episode: 1,
          show: 1,
          likes: 1,
          dislikes: 1,
          replies: {
            _id: 1,
            text: 1,
            created: 1,
            user: 1,
            season: 1,
            episode: 1,
            show: 1,
            likes: 1,
            dislikes: 1,
            count: { $size: "$replies" }
          }
        }
      },
      // Fourth stage: sort the documents by failed and created date
      {
        $sort: { failed: -1, created: -1 }
      }
    ]).exec();

    await commentsModel.populate(results, { path: 'user' });
    await commentsModel.populate(results, { path: 'season' });
    await commentsModel.populate(results, { path: 'episode' });
    await commentsModel.populate(results, { path: 'show' });
    await replyModel.populate(results, { path: 'replies.user' });
    await replyModel.populate(results, { path: 'replies.season' });
    await replyModel.populate(results, { path: 'replies.episode' });
    await replyModel.populate(results, { path: 'replies.show' });

    return res.json({ failed: false, results });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error, failed: true, message: 'Server error!' });
  }
});

module.exports = router;
