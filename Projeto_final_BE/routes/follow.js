var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var followController = require('../controller/followController');

router.post('/',followController.makeFollow);
router.get('/',followController.getFollower);


module.exports = router;
