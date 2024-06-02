const Like = require('../sequelize').Like;
var jwt = require('jsonwebtoken');



exports.addLike = (req, res, next) => {
    const { tweet_id, user_id } = req.body;

    Like.findOne({
        where: { tweet_id: tweet_id, user_id: user_id }
    })
    .then(result => {
        if (result == null) {
            return Like.create({
                tweet_id: tweet_id,
                user_id: user_id,
            });
        } else {
            console.log("You already liked this tweet." );
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


