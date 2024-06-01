const Comment = require('../sequelize').Comment;
var jwt = require('jsonwebtoken');
const comments = require('../models/comments');

exports.createCommente = (req, res, next) => {
   
        const { user_id, text,Date_comment , tweet_id} = req.body; 

        Comment.create({ user_id, text, Date_comment, tweet_id })
            .then(newcomm => {
                res.send("Comment inserted with id: " + newcomm.id);
            })
            .catch(error => {
                res.status(500).json({ error: error.message });
            });
    
};


exports.getComments = (req, res, next) => {
    Comment.findAll()
        .then(comments => {
            res.send(comments);
        })
        .catch(error => {
            console.error('Error fetching comments:', error);
            res.status(500).send('Error fetching comments');
        });
};


