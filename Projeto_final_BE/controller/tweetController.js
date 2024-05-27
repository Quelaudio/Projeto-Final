// const Tweet = require('../sequelize').tweets;

const { where } = require('sequelize');

// exports.postTweet = (req, res, next)=>{
//     Tweet.create(req.body)
//         .then(newTweet => {
//             res.send("Inserted with ID: " + newTweet.tweet_id);
//         })
//         .catch(error => {
//             console.error('Error posting tweet:', error);
//             res.status(500).send('Error posting tweet');
//         });
// };
    

// controller/tweetController.js
const Tweet = require('../sequelize').Tweet;

exports.createTweet=(req,res,next)=>{
    Tweet.create(req.body)
    .then(newTweet => {
            res.send("Inserted with ID: "+ newTweet.user_id);
    });
}


exports.getTweets = (req, res, next)=> {
    Tweet.findAll()
        .then(Tweets => {
            res.send(Tweets);
        });
};

exports.upTweets = (req, res, next) => {
    const { tweet_id, text, img_path, date_pub } = req.body;

    Tweet.update(
        {
            text: text,
            img_path: img_path,
            date_pub: date_pub
        },
        {
            where: {
                tweet_id: tweet_id
            }
        }
    ).then(result => {
        if (result[0] === 0) {
            
            res.status(404).json({ message: "Tweet not found or no changes made" });
        } else {
            res.status(200).json({ message: "Tweet updated successfully" });
        }
    }).catch(err => {
        res.status(500).json({ error: err.message });
    });
};
