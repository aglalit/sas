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
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

var index = require('./routes/index');
var User = require('./models/user');
var Session = require('./models/session');

var promise = mongoose.connect("mongodb://m.r.agliulin:m.r.agliulinsas2017@ds147534.mlab.com:47534/sas", {useMongoClient: true});



// Connection URL
var url = "mongodb://m.r.agliulin:m.r.agliulinsas2017@ds147534.mlab.com:47534/sas";
const GOOGLE_CLIENT_ID = "118043106079-9di4ho7ofbpqq6de49t68dvbjm37kq83.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "wumdeuRozgysj238MJtBy5kg";
// Use connect method to connect to the server
var db = mongoose.connection;

promise.then(function(db) {
  db.on('error', console.error.bind(console, 'connection error:'));
  db.on('open', function() {
    console.log('Mongo is connected');
  });
});

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', port: 465, secure: true, // secure:true for port 465, secure:false for port 587
  auth: {
    user: 'marat.goya@gmail.com',
    pass: 'tpjtmfpffyikaxgh'
  }
});

app.set('port', (process.env.PORT || 5000));
// view engine setup
app.set('views', [
  path.join(__dirname, 'views'),
  path.join(__dirname, 'views/polls/')
]);
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// required for passport
app.use(session({secret: 'schoolofadvancedstudiessecret'})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
require('./config/passport')(passport);
app.use(flash()); // use connect-flash for flash messages stored in session
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

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

app.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/polls/5th-module-electives',
  failureRedirect: '/login'
}));
// passport.authenticate('google'),
// function(req, res) {
//   res.render('polls_ai_metaphor',{user:req.user})
// });

app.get('/polls', isLoggedIn, function(req, res) {
  res.render('polls', {user: req.user})
});

app.get('/polls-anonymous', function(req, res) {
  res.render('polls_anonymous', {messages: req.flash('info')})
});

require('./server/gi_part6.js')(app, Session, transporter);
require('./server/feminism.js')(app, Session, transporter);
require('./server/great-books.js')(app, Session, transporter);
require('./server/electives.js')(app, Session, transporter);
require('./server/tfy.js')(app, Session, transporter);



// require('./server/4th-module-electives.js')(app, Session, transporter, isLoggedIn);

app.get('/polls/5th-module-electives', isLoggedIn, function(req, res) {
  res.render('5th-module-electives', {user: req.user})
});

app.post('/polls/5th-module-electives', function(req, res) {
  User.findOne({
    '_id': req.user._id
  }, function(err, user) {
    if (err)
      return done(err);

    if (user) {
      user.polls.ELECTIVES["5module__electives"].elective1 = req.body["elective1"];
      user.polls.ELECTIVES["5module__electives"].elective2 = req.body["elective2"];
      user.polls.ELECTIVES["5module__electives"].elective3 = req.body["elective3"];

      var now = new Date();
      user.polls.ELECTIVES["5module__electives"].time = now.toLocaleString('en-US', {timeZone: 'Asia/Yekaterinburg'});

      user.save(function(err, user) {
        if (err)
          return console.error(err);
        }
      );
    } else {
      console.log('There isn\'t such user in the database');
    }
  });
  req.flash('info', `Ваш результат принят (1-й приоритет — ${req.body["elective1"]}; 2-й приоритет — ${req.body["elective2"]}; 3-й приоритет — ${req.body["elective3"]}). Благодарим за участие.`);
  let mailOptions = {
    from: '"SAS" <sas@utmn.ru>', // sender address
    to: 'marat.goya@gmail.com, e.samokhvalova@utmn.ru', // list of receivers
    subject: 'Новый результат опроса по семинарам и лекциям Школы', // Subject line
    // text: JSON.stringify(req.user), // plain text body
    html: '<b>' + JSON.stringify(req.user.google.email) + '<br/><br/>' + JSON.stringify(req.body) + '</b>' // html body
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
  res.render('polls', {
    user: req.user,
    messages: req.flash('info')
  });
});


app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/polls');
});

function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    console.log(req.isAuthenticated());
    console.log('isAuthenticated');
    return next();
  }

  // if they aren't redirect them to the home page
  console.log(req.isAuthenticated());
  res.redirect('/login');
}

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
  res.locals.error = err;
  // = req.app.get('env') === 'development'
  //   ? err
  //   : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
