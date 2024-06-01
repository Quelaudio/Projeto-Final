var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var likeController = require('../controller/likeController')




router.post('/',likeController.addLike);