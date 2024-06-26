var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var tweetController = require('../controller/tweetController');
var multer = require ('multer');
//var auth = require('auth.js');

// router.use(authenticateTokenFromHeaders);

// function authenticateTokenFromHeaders(req, res, next) {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (token == null) return res.sendStatus(401); // If there's no token, return 401 Unauthorized

//   jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
//       if (err) return res.sendStatus(403); // If token is not valid, return 403 Forbidden
//       req.user = user;
//       next(); // Proceed to the next middleware or route handler
//   });
// }

// function checkBlacklistedToken(req, res, next) {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (checkBlacklistedToken.includes(token)) {
//       return res.status(401).json({ message: 'Token is blacklisted' });
//   }

//   next();
// }

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });





router.post('/', tweetController.createTweet, upload.single('img'));
router.get('/', tweetController.getTweets);
router.put('/:tweet_id',tweetController.upTweets)
router.delete('/delete/:tweet_id',tweetController.deleteTweet)

module.exports = router;