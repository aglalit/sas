var express = require('express');
var router = express.Router();
var path = require('path');
const nodemailer = require('nodemailer');
const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.sendFile(path.join(__dirname, '..', '/public/lectures.html'));
  res.redirect(301, 'sas.utmn.ru')
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

module.exports = router;
