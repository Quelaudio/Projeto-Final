var tweetController = require('../controller/tweetController');

router.post('/', tweetController.postTweet);