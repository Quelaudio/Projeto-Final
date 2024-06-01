const Like = require('../sequelize').Like;
var jwt = require('jsonwebtoken');



exports.addLike = (req, res, next) => {
    const { tweetId, user_id } = req.body;

    Like.findOne({
        where: { tweet_id: tweetId, user_id: user_id }
    })
    .then(result => {
        if (result) {
            res.status(400).json({ message: "You already liked this tweet." });
        } else {
            return Like.create({
                tweet_id: tweetId,
                user_id: user_id,
                liked_date: new Date()
            });
        }
    })
    .then(() => {
        res.status(201).json({ message: 'Tweet liked successfully' });
    })
    .catch(error => {
        console.error('Error liking tweet:', error);
        res.status(500).json({ error: 'An error occurred while liking the tweet' });
    });
};


