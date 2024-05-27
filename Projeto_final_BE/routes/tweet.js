var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')


var tweetController = require('../controller/tweetController');

router.post('/', tweetController.createTweet);
router.get('/', tweetController.getTweets);
router.put('/',tweetController.upTweets)

module.exports = router;