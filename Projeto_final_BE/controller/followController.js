const Follow = require('../sequelize').Follow;
var jwt = require('jsonwebtoken');
const follower = require('../models/follower');


exports.makeFollow = (req, res, next) => {
        const { follower_id, followed_id,follow_date } = req.body;

        Follow.create({ follower_id, followed_id,follow_date })
            .then(newFolow => {
                res.send("Inserted with ID: " + newFolow.id);
            })
            .catch(error => {
                res.status(500).json({ error: error.message });
            });
   
};


exports.getFollower = (req, res, next) => {
    Follow.findAll()
        .then(follower => {
            res.send(follower);
        })
        .catch(error => {
            console.error('Error fetching follower:', error);
            res.status(500).send('Error fetching follower');
        });
};