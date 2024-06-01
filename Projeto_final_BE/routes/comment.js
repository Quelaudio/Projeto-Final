var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var commentController = require('../controller/commentController');

router.post('/',commentController.createCommente);

router.get('/',commentController.getComments);


module.exports = router;
