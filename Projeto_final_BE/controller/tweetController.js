const Tweet = require('../sequelize').tweets;

exports.postTweet = (req, res, next)=>{
    Tweet.create(req.body)
        .then(newTweet => {
            res.send("Inserted with ID: " + newTweet.tweet_id);
        })
        .catch(error => {
            console.error('Error posting tweet:', error);
            res.status(500).send('Error posting tweet');
        });
};
    