const Comment = require('../sequelize').Comment;
const jwt = require('jsonwebtoken');

exports.createComment = (req, res, next) => {
    const { user_id, text, Date_comment, tweet_id } = req.body; 

    Comment.create({ user_id, text, Date_comment, tweet_id })
        .then(newComment => {
            res.json(newComment);
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
};

exports.getComments = (req, res, next) => {
    const { tweet_id } = req.params; 

    Comment.findAll({ where: { tweet_id } })
        .then(comments => {
            res.json(comments);
        })
        .catch(error => {
            console.error('Error fetching comments:', error);
            res.status(500).send('Error fetching comments');
        });
};


