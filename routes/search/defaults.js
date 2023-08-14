const mongoose = require('mongoose');
const moviesModel = require('../../Schemas/movies');
const showsModel = require('../../Schemas/Shows');
const router = require('express').Router()


router.post('/', async(req,res)=>{
    try{    



        const query = req.body.query;
        if(req.body.type === 'movies'){

            const results = await moviesModel.find(
                { $text: { $search: query } },
            ).sort({ score: { $meta: "textScore" } }).exec();

            return res.json({ failed: false, results: results });
        }
        else if(req.body.type==='shows'){

            const results = await showsModel.find(
                { $text: { $search: query } },
            ).sort({ score: { $meta: "textScore" } }).exec();

            return res.json({ failed: false, results: results });
        }
        else{
            // USING AGGREGATE TO FIND IN BOTH DOCS
            const results = await Promise.all([
                moviesModel.aggregate([
                    { $match: { $text: { $search: query } } },
                    { $addFields: { collection: 'movies' } },
                    { $project: { _id: 0, title: 1, key: 1, type: 1, _id: 1, runtime: 1, release_date: 1, popularity: 1, banda: 1, overview: 1, poster_path: 1, backdrop_path: 1, adult: 1, budget: 1, revenue: 1, pictures: 1, imdb_id: 1, captions: 1, tmdb_id: 1, origin_country: 1, original_language: 1, status: 1, dj: 1, vote_average: 1, vote_count: 1, trailer: 1, translated: 1, uncategorized: 1, rated: 1, shares: 1, downloads: 1, subscribers: 1, player: 1, genres: 1, comments: 1, details: 1, completed: 1, recommends: 1, credits: 1, production_companies: 1, dp: 1, cover: 1, created: 1, score: { $meta: 'textScore' }, collection: 1 } },
                ]),
                showsModel.aggregate([
                    { $match: { $text: { $search: query } } },
                    { $addFields: { collection: 'shows' } },
                    { $project: { _id: 0, title: 1, key: 1, type: 1, _id: 1, runtime: 1, release_date: 1, popularity: 1, banda: 1, overview: 1, poster_path: 1, backdrop_path: 1, adult: 1, budget: 1, revenue: 1, pictures: 1, imdb_id: 1, captions: 1, tmdb_id: 1, origin_country: 1, original_language: 1, status: 1, dj: 1, vote_average: 1, vote_count: 1, trailer: 1, translated: 1, uncategorized: 1, rated: 1, shares: 1, downloads: 1, subscribers: 1, player: 1, genres: 1, comments: 1, details: 1, completed: 1, recommends: 1, credits: 1, production_companies: 1, dp: 1, cover: 1, created: 1, score: { $meta: 'textScore' }, collection: 1 } },
                ])
            ]);
            const sortedResults = results.flat().sort((a, b) => b.score - a.score);
            return res.json({ failed: false, results: sortedResults });
        }
    }
    catch(er){
        return res.json({error:er,failed:true,message:'express server imepata hitilafu!'}).status(500)
    }
})

module.exports = router;
