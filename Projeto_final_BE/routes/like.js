var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var likeController = require('../controller/lieController')




router.post('/',likeController.addLike);