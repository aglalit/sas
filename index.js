var express = require('express');
var app = express();
var router = express.Router();
var xFrameOptions = require('x-frame-options');
var subdomain = require('express-subdomain');
var path = require('path');
var env = process.env;
var favicon = require('serve-favicon');
var logger = require('morgan');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const fs = require('fs');

var index = require('./routes/index');
var users = require('./routes/users');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: 'marat.goya@gmail.com',
        pass: 'tpjtmfpffyikaxgh'
    }
});


app.set('port', (process.env.PORT || 5000));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(xFrameOptions('ALLOW-FROM http://webvisor.com/'));
// app.use(evercookie.backend({
//   pngPath: '/evercookie_png.php',
//   etagPath: '/evercookie_etag.php',
//   cachePath: '/evercookie_cache.php'
// }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(compression());

app.use('/', index);
app.use(subdomain('advanced', router));
//openshift health app test
app.get('/health', function(req, res) {
  res.writeHead(200);
  res.end();
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

app.use('/users', users);
app.post('/subscribe', function(req, res) {

    var email = req.body.email;
    console.log("Received new email: " + email);
    fs.readFile('public/assets/emails.txt', (err, data) => {
      if (err) console.log(err);
      fs.writeFile('public/assets/emails.txt', data + '\n' + email)
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"SAS" <sas@utmn.ru>', // sender address
        to: 'marat.goya@gmail.com', // list of receivers
        subject: 'Новый подписчик на рассылку Школы перспективных исследований', // Subject line
        text: email, // plain text body
        html: '<b>'+email+'</b>' // html body
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
    res.redirect('/');
});
app.post('/sendresult', function(req, res) {
    var now = new Date();
    var results = now.toLocaleString('en-US', { timeZone: 'Asia/Yekaterinburg' }) + ' - ' + req.headers['x-forwarded-for'] + ': ' + req.body;
    console.log("Received new test result: " + results);
    fs.readFile('public/assets/results.txt', (err, data) => {
      if (err) console.log(err);
      fs.writeFile('public/assets/results.txt', data + '\n' + results)
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"SAS" <sas@utmn.ru>', // sender address
        to: 'marat.goya@gmail.com', // list of receivers
        subject: 'Новый результат опроса по открытым лекциям Школы', // Subject line
        text: results, // plain text body
        html: '<b>'+results+'</b>' // html body
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
