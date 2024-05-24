var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
// var usersController = require('../controllers/usersController')

router.use(authenticateTokenFromHeaders);

function authenticateTokenFromHeaders(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // If there's no token, return 401 Unauthorized

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403); // If token is not valid, return 403 Forbidden
      req.user = user;
      next(); // Proceed to the next middleware or route handler
  });
}

// router.get('/',usersController.getAllusers)




module.exports = router;

