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
  successRedirect: '/polls/2nd-module-electives',
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

app.get('/polls-ai-metaphor', isLoggedIn, function(req, res) {
  res.render('polls_ai_metaphor', {user: req.user})
});

app.get('/polls-ai-interpretation-ru', function(req, res) {

  res.render('polls_ai_interpretation_ru');
});
app.get('/polls-ai-interpretation-en', function(req, res) {

  res.render('polls_ai_interpretation_en');
});

app.post('/polls-ai-interpretation-ru', function(req, res) {
  Session.findOne({
    'session_id': req.session.id
  }, function(err, session) {
    if (err)
      return done(err);

    if (session) {
      var now = new Date();

      session.polls.AI_Interpretation.language = 'ru';
      session.polls.AI_Interpretation.time = now.toLocaleString('en-US', {timeZone: 'Asia/Yekaterinburg'});
      session.polls.AI_Interpretation.LECTURES["Как хорошо были организованы материалы курса"] = parseInt(req.body["Как хорошо были организованы материалы курса"]);
      session.polls.AI_Interpretation.LECTURES["Насколько пунктуален был преподаватель (лекции)(лектор 1)"] = parseInt(req.body["Насколько пунктуален был преподаватель (лекции)(лектор 1)"]);
      session.polls.AI_Interpretation.LECTURES["Насколько пунктуален был преподаватель (лекции)(лектор 2)"] = parseInt(req.body["Насколько пунктуален был преподаватель (лекции)(лектор 2)"]);
      session.polls.AI_Interpretation.LECTURES["Насколько полно преподаватель следовал программе курса(лектор 1)"] = parseInt(req.body["Насколько полно преподаватель следовал программе курса(лектор 1)"]);
      session.polls.AI_Interpretation.LECTURES["Насколько полно преподаватель следовал программе курса(лектор 2)"] = parseInt(req.body["Насколько полно преподаватель следовал программе курса(лектор 2)"]);
      session.polls.AI_Interpretation.LECTURES["Оцените сложность лекций для вашего понимания(лектор 1)"] = parseInt(req.body["Оцените сложность лекций для вашего понимания(лектор 1)"]);
      session.polls.AI_Interpretation.LECTURES["Оцените сложность лекций для вашего понимания(лектор 2)"] = parseInt(req.body["Оцените сложность лекций для вашего понимания(лектор 2)"]);
      session.polls.AI_Interpretation.LECTURES["Насколько новым для вас было содержание лекций(лектор 1)"] = parseInt(req.body["Насколько новым для вас было содержание лекций(лектор 1)"]);
      session.polls.AI_Interpretation.LECTURES["Насколько новым для вас было содержание лекций(лектор 2)"] = parseInt(req.body["Насколько новым для вас было содержание лекций(лектор 2)"]);
      session.polls.AI_Interpretation.LECTURES["Насколько вам понравилась манера чтения лекций этим преподавателем(лектор 1)"] = parseInt(req.body["Насколько вам понравилась манера чтения лекций этим преподавателем(лектор 1)"]);
      session.polls.AI_Interpretation.LECTURES["Насколько вам понравилась манера чтения лекций этим преподавателем(лектор 2)"] = parseInt(req.body["Насколько вам понравилась манера чтения лекций этим преподавателем(лектор 2)"]);
      session.polls.AI_Interpretation.LECTURES["Насколько изменились ваше мышление, знания и умения"] = parseInt(req.body["Насколько изменились ваше мышление, знания и умения"]);
      session.polls.AI_Interpretation.LECTURES["Хотите ли вы снова встретиться с этим преподавателем на других курсах(лектор 1)"] = parseInt(req.body["Хотите ли вы снова встретиться с этим преподавателем на других курсах(лектор 1)"]);
      session.polls.AI_Interpretation.LECTURES["Хотите ли вы снова встретиться с этим преподавателем на других курсах(лектор 2)"] = parseInt(req.body["Хотите ли вы снова встретиться с этим преподавателем на других курсах(лектор 2)"]);
      session.polls.AI_Interpretation.LECTURES["Если бы этот курс не входил в ядро, взяли бы вы его как электив"] = parseInt(req.body["Если бы этот курс не входил в ядро, взяли бы вы его как электив"]);
      session.polls.AI_Interpretation.LECTURES["Что вам больше всего понравилось в этом лекционном курсе"] = req.body["Что вам больше всего понравилось в этом лекционном курсе"];
      session.polls.AI_Interpretation.LECTURES["Что вам больше всего не понравилось в этом лекционном курсе"] = req.body["Что вам больше всего не понравилось в этом лекционном курсе"];
      session.polls.AI_Interpretation.LECTURES["Что для вас было самым сложным в этом лекционном курсе"] = req.body["Что для вас было самым сложным в этом лекционном курсе"];
      session.polls.AI_Interpretation.LECTURES["Как бы вы порекомендовали улучшить этот лекционный курс"] = req.body["Как бы вы порекомендовали улучшить этот лекционный курс"];

      session.polls.AI_Interpretation.SEMINARS["Укажите имя и фамилию преподавателя, работавшего с вами на семинарах"] = req.body["Укажите имя и фамилию преподавателя, работавшего с вами на семинарах"];
      session.polls.AI_Interpretation.SEMINARS["Насколько полно преподаватель следовал темам"] = parseInt(req.body["Насколько полно преподаватель следовал темам"]);
      session.polls.AI_Interpretation.SEMINARS["Насколько хорошо преподаватель организует интерактивную коммуникацию в группе"] = parseInt(req.body["Насколько хорошо преподаватель организует интерактивную коммуникацию в группе"]);
      session.polls.AI_Interpretation.SEMINARS["Сколько раз в течение одного семинарского занятия вы (в среднем) высказывались вслух"] = parseInt(req.body["Сколько раз в течение одного семинарского занятия вы (в среднем) высказывались вслух"]);
      session.polls.AI_Interpretation.SEMINARS["Насколько хорошо преподаватель объясняет материал"] = parseInt(req.body["Насколько хорошо преподаватель объясняет материал"]);
      session.polls.AI_Interpretation.SEMINARS["Насколько семинарские занятия помогли вам освоить материал лекций"] = parseInt(req.body["Насколько семинарские занятия помогли вам освоить материал лекций"]);
      session.polls.AI_Interpretation.SEMINARS["Насколько пунктуален был преподаватель"] = parseInt(req.body["Насколько пунктуален был преподаватель"]);
      session.polls.AI_Interpretation.SEMINARS["Какую оценку (балл от 0 до 10) вы ожидаете получить за эту часть курса"] = parseInt(req.body["Какую оценку (балл от 0 до 10) вы ожидаете получить за эту часть курса"]);
      session.polls.AI_Interpretation.SEMINARS["Готовы ли вы снова встретиться с этим преподавателем на других курсах"] = parseInt(req.body["Готовы ли вы снова встретиться с этим преподавателем на других курсах"]);
      session.polls.AI_Interpretation.SEMINARS["Сколько процентов обязательных текстов по этой части курса вы успевали прочесть"] = parseInt(req.body["Сколько процентов обязательных текстов по этой части курса вы успевали прочесть"]);
      session.polls.AI_Interpretation.SEMINARS["Сколько часов в неделю вы уделяли внеаудиторной работе по этой части курса"] = parseInt(req.body["Сколько часов в неделю вы уделяли внеаудиторной работе по этой части курса"]);
      session.polls.AI_Interpretation.SEMINARS["Что вам больше всего понравилось в этом семинаре"] = req.body["Что вам больше всего понравилось в этом семинаре"];
      session.polls.AI_Interpretation.SEMINARS["Что вам больше всего не понравилось в этом семинаре"] = req.body["Что вам больше всего не понравилось в этом семинаре"];
      session.polls.AI_Interpretation.SEMINARS["Что для вас было самым сложным в этом семинаре"] = req.body["Что для вас было самым сложным в этом семинаре"];
      session.polls.AI_Interpretation.SEMINARS["Как бы вы порекомендовали улучшить этот семинар"] = req.body["Как бы вы порекомендовали улучшить этот семинар"];

      session.save(function(err, session) {
        if (err)
          return console.error(err);
        }
      );
      let mailOptions = {
        from: '"SAS" <sas@utmn.ru>', // sender address
        to: 'marat.goya@gmail.com', // list of receivers
        subject: 'Новый результат опроса по семинарам и лекциям Школы', // Subject line
        // text: JSON.stringify(req.user), // plain text body
        html: '<b>' + JSON.stringify(req.session.id) + '<br/><br/>' + JSON.stringify(req.body) + '</b>' // html body
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
      });
    } else {
      var newSession = new Session();
      var now = new Date();

      newSession.session_id = req.session.id;
      newSession.polls.AI_Interpretation.language = 'ru';
      newSession.polls.AI_Interpretation.time = now.toLocaleString('en-US', {timeZone: 'Asia/Yekaterinburg'});
      newSession.polls.AI_Interpretation.LECTURES["Как хорошо были организованы материалы курса"] = parseInt(req.body["Как хорошо были организованы материалы курса"]);
      newSession.polls.AI_Interpretation.LECTURES["Насколько пунктуален был преподаватель (лекции)(лектор 1)"] = parseInt(req.body["Насколько пунктуален был преподаватель (лекции)(лектор 1)"]);
      newSession.polls.AI_Interpretation.LECTURES["Насколько пунктуален был преподаватель (лекции)(лектор 2)"] = parseInt(req.body["Насколько пунктуален был преподаватель (лекции)(лектор 2)"]);
      newSession.polls.AI_Interpretation.LECTURES["Насколько полно преподаватель следовал программе курса(лектор 1)"] = parseInt(req.body["Насколько полно преподаватель следовал программе курса(лектор 1)"]);
      newSession.polls.AI_Interpretation.LECTURES["Насколько полно преподаватель следовал программе курса(лектор 2)"] = parseInt(req.body["Насколько полно преподаватель следовал программе курса(лектор 2)"]);
      newSession.polls.AI_Interpretation.LECTURES["Оцените сложность лекций для вашего понимания(лектор 1)"] = parseInt(req.body["Оцените сложность лекций для вашего понимания(лектор 1)"]);
      newSession.polls.AI_Interpretation.LECTURES["Оцените сложность лекций для вашего понимания(лектор 2)"] = parseInt(req.body["Оцените сложность лекций для вашего понимания(лектор 2)"]);
      newSession.polls.AI_Interpretation.LECTURES["Насколько новым для вас было содержание лекций(лектор 1)"] = parseInt(req.body["Насколько новым для вас было содержание лекций(лектор 1)"]);
      newSession.polls.AI_Interpretation.LECTURES["Насколько новым для вас было содержание лекций(лектор 2)"] = parseInt(req.body["Насколько новым для вас было содержание лекций(лектор 2)"]);
      newSession.polls.AI_Interpretation.LECTURES["Насколько вам понравилась манера чтения лекций этим преподавателем(лектор 1)"] = parseInt(req.body["Насколько вам понравилась манера чтения лекций этим преподавателем(лектор 1)"]);
      newSession.polls.AI_Interpretation.LECTURES["Насколько вам понравилась манера чтения лекций этим преподавателем(лектор 2)"] = parseInt(req.body["Насколько вам понравилась манера чтения лекций этим преподавателем(лектор 2)"]);
      newSession.polls.AI_Interpretation.LECTURES["Насколько изменились ваше мышление, знания и умения"] = parseInt(req.body["Насколько изменились ваше мышление, знания и умения"]);
      newSession.polls.AI_Interpretation.LECTURES["Хотите ли вы снова встретиться с этим преподавателем на других курсах(лектор 1)"] = parseInt(req.body["Хотите ли вы снова встретиться с этим преподавателем на других курсах(лектор 1)"]);
      newSession.polls.AI_Interpretation.LECTURES["Хотите ли вы снова встретиться с этим преподавателем на других курсах(лектор 2)"] = parseInt(req.body["Хотите ли вы снова встретиться с этим преподавателем на других курсах(лектор 2)"]);
      newSession.polls.AI_Interpretation.LECTURES["Если бы этот курс не входил в ядро, взяли бы вы его как электив"] = parseInt(req.body["Если бы этот курс не входил в ядро, взяли бы вы его как электив"]);
      newSession.polls.AI_Interpretation.LECTURES["Что вам больше всего понравилось в этом лекционном курсе"] = req.body["Что вам больше всего понравилось в этом лекционном курсе"];
      newSession.polls.AI_Interpretation.LECTURES["Что вам больше всего не понравилось в этом лекционном курсе"] = req.body["Что вам больше всего не понравилось в этом лекционном курсе"];
      newSession.polls.AI_Interpretation.LECTURES["Что для вас было самым сложным в этом лекционном курсе"] = req.body["Что для вас было самым сложным в этом лекционном курсе"];
      newSession.polls.AI_Interpretation.LECTURES["Как бы вы порекомендовали улучшить этот лекционный курс"] = req.body["Как бы вы порекомендовали улучшить этот лекционный курс"];

      newSession.polls.AI_Interpretation.SEMINARS["Укажите имя и фамилию преподавателя, работавшего с вами на семинарах"] = req.body["Укажите имя и фамилию преподавателя, работавшего с вами на семинарах"];
      newSession.polls.AI_Interpretation.SEMINARS["Насколько полно преподаватель следовал темам"] = parseInt(req.body["Насколько полно преподаватель следовал темам"]);
      newSession.polls.AI_Interpretation.SEMINARS["Насколько хорошо преподаватель организует интерактивную коммуникацию в группе"] = parseInt(req.body["Насколько хорошо преподаватель организует интерактивную коммуникацию в группе"]);
      newSession.polls.AI_Interpretation.SEMINARS["Сколько раз в течение одного семинарского занятия вы (в среднем) высказывались вслух"] = parseInt(req.body["Сколько раз в течение одного семинарского занятия вы (в среднем) высказывались вслух"]);
      newSession.polls.AI_Interpretation.SEMINARS["Насколько хорошо преподаватель объясняет материал"] = parseInt(req.body["Насколько хорошо преподаватель объясняет материал"]);
      newSession.polls.AI_Interpretation.SEMINARS["Насколько семинарские занятия помогли вам освоить материал лекций"] = parseInt(req.body["Насколько семинарские занятия помогли вам освоить материал лекций"]);
      newSession.polls.AI_Interpretation.SEMINARS["Насколько пунктуален был преподаватель"] = parseInt(req.body["Насколько пунктуален был преподаватель"]);
      newSession.polls.AI_Interpretation.SEMINARS["Какую оценку (балл от 0 до 10) вы ожидаете получить за эту часть курса"] = parseInt(req.body["Какую оценку (балл от 0 до 10) вы ожидаете получить за эту часть курса"]);
      newSession.polls.AI_Interpretation.SEMINARS["Готовы ли вы снова встретиться с этим преподавателем на других курсах"] = parseInt(req.body["Готовы ли вы снова встретиться с этим преподавателем на других курсах"]);
      newSession.polls.AI_Interpretation.SEMINARS["Сколько процентов обязательных текстов по этой части курса вы успевали прочесть"] = parseInt(req.body["Сколько процентов обязательных текстов по этой части курса вы успевали прочесть"]);
      newSession.polls.AI_Interpretation.SEMINARS["Сколько часов в неделю вы уделяли внеаудиторной работе по этой части курса"] = parseInt(req.body["Сколько часов в неделю вы уделяли внеаудиторной работе по этой части курса"]);
      newSession.polls.AI_Interpretation.SEMINARS["Что вам больше всего понравилось в этом семинаре"] = req.body["Что вам больше всего понравилось в этом семинаре"];
      newSession.polls.AI_Interpretation.SEMINARS["Что вам больше всего не понравилось в этом семинаре"] = req.body["Что вам больше всего не понравилось в этом семинаре"];
      newSession.polls.AI_Interpretation.SEMINARS["Что для вас было самым сложным в этом семинаре"] = req.body["Что для вас было самым сложным в этом семинаре"];
      newSession.polls.AI_Interpretation.SEMINARS["Как бы вы порекомендовали улучшить этот семинар"] = req.body["Как бы вы порекомендовали улучшить этот семинар"];
      newSession.save(function(err) {
        if (err)
          return console.error(err);
        return;
      });
      let mailOptions = {
        from: '"SAS" <sas@utmn.ru>', // sender address
        to: 'marat.goya@gmail.com', // list of receivers
        subject: 'Новый результат опроса по семинарам и лекциям Школы', // Subject line
        // text: JSON.stringify(req.user), // plain text body
        html: '<b>' + JSON.stringify(req.session.id) + '<br/><br/>' + JSON.stringify(req.body) + '</b>' // html body
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
      });
    }
  });
  req.flash('info', 'Ваш результат принят. Благодарим за участие.');
  res.render('polls_anonymous', {messages: req.flash('info')})
});

app.post('/polls-ai-interpretation-en', function(req, res) {
  Session.findOne({
    'session_id': req.session.id
  }, function(err, session) {
    if (err)
      return done(err);

    if (session) {
      var now = new Date();

      session.polls.AI_Interpretation.language = 'en';
      session.polls.AI_Interpretation.time = now.toLocaleString('en-US', {timeZone: 'Asia/Yekaterinburg'});
      session.polls.AI_Interpretation.LECTURES["Как хорошо были организованы материалы курса"] = parseInt(req.body["Как хорошо были организованы материалы курса"]);
      session.polls.AI_Interpretation.LECTURES["Насколько пунктуален был преподаватель (лекции)(лектор 1)"] = parseInt(req.body["Насколько пунктуален был преподаватель (лекции)(лектор 1)"]);
      session.polls.AI_Interpretation.LECTURES["Насколько полно преподаватель следовал программе курса(лектор 1)"] = parseInt(req.body["Насколько полно преподаватель следовал программе курса(лектор 1)"]);
      session.polls.AI_Interpretation.LECTURES["Оцените сложность лекций для вашего понимания(лектор 1)"] = parseInt(req.body["Оцените сложность лекций для вашего понимания(лектор 1)"]);
      session.polls.AI_Interpretation.LECTURES["Насколько новым для вас было содержание лекций(лектор 1)"] = parseInt(req.body["Насколько новым для вас было содержание лекций(лектор 1)"]);
      session.polls.AI_Interpretation.LECTURES["Насколько вам понравилась манера чтения лекций этим преподавателем(лектор 1)"] = parseInt(req.body["Насколько вам понравилась манера чтения лекций этим преподавателем(лектор 1)"]);
      session.polls.AI_Interpretation.LECTURES["Насколько изменились ваше мышление, знания и умения"] = parseInt(req.body["Насколько изменились ваше мышление, знания и умения"]);
      session.polls.AI_Interpretation.LECTURES["Хотите ли вы снова встретиться с этим преподавателем на других курсах(лектор 1)"] = parseInt(req.body["Хотите ли вы снова встретиться с этим преподавателем на других курсах(лектор 1)"]);
      session.polls.AI_Interpretation.LECTURES["Если бы этот курс не входил в ядро, взяли бы вы его как электив"] = parseInt(req.body["Если бы этот курс не входил в ядро, взяли бы вы его как электив"]);
      session.polls.AI_Interpretation.LECTURES["Что вам больше всего понравилось в этом лекционном курсе"] = req.body["Что вам больше всего понравилось в этом лекционном курсе"];
      session.polls.AI_Interpretation.LECTURES["Что вам больше всего не понравилось в этом лекционном курсе"] = req.body["Что вам больше всего не понравилось в этом лекционном курсе"];
      session.polls.AI_Interpretation.LECTURES["Что для вас было самым сложным в этом лекционном курсе"] = req.body["Что для вас было самым сложным в этом лекционном курсе"];
      session.polls.AI_Interpretation.LECTURES["Как бы вы порекомендовали улучшить этот лекционный курс"] = req.body["Как бы вы порекомендовали улучшить этот лекционный курс"];

      session.polls.AI_Interpretation.SEMINARS["Укажите имя и фамилию преподавателя, работавшего с вами на семинарах"] = req.body["Укажите имя и фамилию преподавателя, работавшего с вами на семинарах"];
      session.polls.AI_Interpretation.SEMINARS["Насколько полно преподаватель следовал темам"] = parseInt(req.body["Насколько полно преподаватель следовал темам"]);
      session.polls.AI_Interpretation.SEMINARS["Насколько хорошо преподаватель организует интерактивную коммуникацию в группе"] = parseInt(req.body["Насколько хорошо преподаватель организует интерактивную коммуникацию в группе"]);
      session.polls.AI_Interpretation.SEMINARS["Сколько раз в течение одного семинарского занятия вы (в среднем) высказывались вслух"] = parseInt(req.body["Сколько раз в течение одного семинарского занятия вы (в среднем) высказывались вслух"]);
      session.polls.AI_Interpretation.SEMINARS["Насколько хорошо преподаватель объясняет материал"] = parseInt(req.body["Насколько хорошо преподаватель объясняет материал"]);
      session.polls.AI_Interpretation.SEMINARS["Насколько семинарские занятия помогли вам освоить материал лекций"] = parseInt(req.body["Насколько семинарские занятия помогли вам освоить материал лекций"]);
      session.polls.AI_Interpretation.SEMINARS["Насколько пунктуален был преподаватель"] = parseInt(req.body["Насколько пунктуален был преподаватель"]);
      session.polls.AI_Interpretation.SEMINARS["Какую оценку (балл от 0 до 10) вы ожидаете получить за эту часть курса"] = parseInt(req.body["Какую оценку (балл от 0 до 10) вы ожидаете получить за эту часть курса"]);
      session.polls.AI_Interpretation.SEMINARS["Готовы ли вы снова встретиться с этим преподавателем на других курсах"] = parseInt(req.body["Готовы ли вы снова встретиться с этим преподавателем на других курсах"]);
      session.polls.AI_Interpretation.SEMINARS["Сколько процентов обязательных текстов по этой части курса вы успевали прочесть"] = parseInt(req.body["Сколько процентов обязательных текстов по этой части курса вы успевали прочесть"]);
      session.polls.AI_Interpretation.SEMINARS["Сколько часов в неделю вы уделяли внеаудиторной работе по этой части курса"] = parseInt(req.body["Сколько часов в неделю вы уделяли внеаудиторной работе по этой части курса"]);
      session.polls.AI_Interpretation.SEMINARS["Что вам больше всего понравилось в этом семинаре"] = req.body["Что вам больше всего понравилось в этом семинаре"];
      session.polls.AI_Interpretation.SEMINARS["Что вам больше всего не понравилось в этом семинаре"] = req.body["Что вам больше всего не понравилось в этом семинаре"];
      session.polls.AI_Interpretation.SEMINARS["Что для вас было самым сложным в этом семинаре"] = req.body["Что для вас было самым сложным в этом семинаре"];
      session.polls.AI_Interpretation.SEMINARS["Как бы вы порекомендовали улучшить этот семинар"] = req.body["Как бы вы порекомендовали улучшить этот семинар"];

      session.save(function(err, session) {
        if (err)
          return console.error(err);
        }
      );
      let mailOptions = {
        from: '"SAS" <sas@utmn.ru>', // sender address
        to: 'marat.goya@gmail.com', // list of receivers
        subject: 'Новый результат опроса по семинарам и лекциям Школы', // Subject line
        // text: JSON.stringify(req.user), // plain text body
        html: '<b>' + JSON.stringify(req.session.id) + '<br/><br/>' + JSON.stringify(req.body) + '</b>' // html body
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
      });
    } else {
      var newSession = new Session();
      var now = new Date();
      newSession.session_id = req.session.id;
      newSession.polls.AI_Interpretation.language = 'en';
      newSession.polls.AI_Interpretation.time = now.toLocaleString('en-US', {timeZone: 'Asia/Yekaterinburg'});
      newSession.polls.AI_Interpretation.LECTURES["Как хорошо были организованы материалы курса"] = parseInt(req.body["Как хорошо были организованы материалы курса"]);
      newSession.polls.AI_Interpretation.LECTURES["Насколько пунктуален был преподаватель (лекции)(лектор 1)"] = parseInt(req.body["Насколько пунктуален был преподаватель (лекции)(лектор 1)"]);
      newSession.polls.AI_Interpretation.LECTURES["Насколько полно преподаватель следовал программе курса(лектор 1)"] = parseInt(req.body["Насколько полно преподаватель следовал программе курса(лектор 1)"]);
      newSession.polls.AI_Interpretation.LECTURES["Оцените сложность лекций для вашего понимания(лектор 1)"] = parseInt(req.body["Оцените сложность лекций для вашего понимания(лектор 1)"]);
      newSession.polls.AI_Interpretation.LECTURES["Насколько новым для вас было содержание лекций(лектор 1)"] = parseInt(req.body["Насколько новым для вас было содержание лекций(лектор 1)"]);
      newSession.polls.AI_Interpretation.LECTURES["Насколько вам понравилась манера чтения лекций этим преподавателем(лектор 1)"] = parseInt(req.body["Насколько вам понравилась манера чтения лекций этим преподавателем(лектор 1)"]);
      newSession.polls.AI_Interpretation.LECTURES["Насколько изменились ваше мышление, знания и умения"] = parseInt(req.body["Насколько изменились ваше мышление, знания и умения"]);
      newSession.polls.AI_Interpretation.LECTURES["Хотите ли вы снова встретиться с этим преподавателем на других курсах(лектор 1)"] = parseInt(req.body["Хотите ли вы снова встретиться с этим преподавателем на других курсах(лектор 1)"]);
      newSession.polls.AI_Interpretation.LECTURES["Если бы этот курс не входил в ядро, взяли бы вы его как электив"] = parseInt(req.body["Если бы этот курс не входил в ядро, взяли бы вы его как электив"]);
      newSession.polls.AI_Interpretation.LECTURES["Что вам больше всего понравилось в этом лекционном курсе"] = req.body["Что вам больше всего понравилось в этом лекционном курсе"];
      newSession.polls.AI_Interpretation.LECTURES["Что вам больше всего не понравилось в этом лекционном курсе"] = req.body["Что вам больше всего не понравилось в этом лекционном курсе"];
      newSession.polls.AI_Interpretation.LECTURES["Что для вас было самым сложным в этом лекционном курсе"] = req.body["Что для вас было самым сложным в этом лекционном курсе"];
      newSession.polls.AI_Interpretation.LECTURES["Как бы вы порекомендовали улучшить этот лекционный курс"] = req.body["Как бы вы порекомендовали улучшить этот лекционный курс"];

      newSession.polls.AI_Interpretation.SEMINARS["Укажите имя и фамилию преподавателя, работавшего с вами на семинарах"] = req.body["Укажите имя и фамилию преподавателя, работавшего с вами на семинарах"];
      newSession.polls.AI_Interpretation.SEMINARS["Насколько полно преподаватель следовал темам"] = parseInt(req.body["Насколько полно преподаватель следовал темам"]);
      newSession.polls.AI_Interpretation.SEMINARS["Насколько хорошо преподаватель организует интерактивную коммуникацию в группе"] = parseInt(req.body["Насколько хорошо преподаватель организует интерактивную коммуникацию в группе"]);
      newSession.polls.AI_Interpretation.SEMINARS["Сколько раз в течение одного семинарского занятия вы (в среднем) высказывались вслух"] = parseInt(req.body["Сколько раз в течение одного семинарского занятия вы (в среднем) высказывались вслух"]);
      newSession.polls.AI_Interpretation.SEMINARS["Насколько хорошо преподаватель объясняет материал"] = parseInt(req.body["Насколько хорошо преподаватель объясняет материал"]);
      newSession.polls.AI_Interpretation.SEMINARS["Насколько семинарские занятия помогли вам освоить материал лекций"] = parseInt(req.body["Насколько семинарские занятия помогли вам освоить материал лекций"]);
      newSession.polls.AI_Interpretation.SEMINARS["Насколько пунктуален был преподаватель"] = parseInt(req.body["Насколько пунктуален был преподаватель"]);
      newSession.polls.AI_Interpretation.SEMINARS["Какую оценку (балл от 0 до 10) вы ожидаете получить за эту часть курса"] = parseInt(req.body["Какую оценку (балл от 0 до 10) вы ожидаете получить за эту часть курса"]);
      newSession.polls.AI_Interpretation.SEMINARS["Готовы ли вы снова встретиться с этим преподавателем на других курсах"] = parseInt(req.body["Готовы ли вы снова встретиться с этим преподавателем на других курсах"]);
      newSession.polls.AI_Interpretation.SEMINARS["Сколько процентов обязательных текстов по этой части курса вы успевали прочесть"] = parseInt(req.body["Сколько процентов обязательных текстов по этой части курса вы успевали прочесть"]);
      newSession.polls.AI_Interpretation.SEMINARS["Сколько часов в неделю вы уделяли внеаудиторной работе по этой части курса"] = parseInt(req.body["Сколько часов в неделю вы уделяли внеаудиторной работе по этой части курса"]);
      newSession.polls.AI_Interpretation.SEMINARS["Что вам больше всего понравилось в этом семинаре"] = req.body["Что вам больше всего понравилось в этом семинаре"];
      newSession.polls.AI_Interpretation.SEMINARS["Что вам больше всего не понравилось в этом семинаре"] = req.body["Что вам больше всего не понравилось в этом семинаре"];
      newSession.polls.AI_Interpretation.SEMINARS["Что для вас было самым сложным в этом семинаре"] = req.body["Что для вас было самым сложным в этом семинаре"];
      newSession.polls.AI_Interpretation.SEMINARS["Как бы вы порекомендовали улучшить этот семинар"] = req.body["Как бы вы порекомендовали улучшить этот семинар"];
      newSession.save(function(err) {
        if (err)
          return console.error(err);
        return;
      });
      let mailOptions = {
        from: '"SAS" <sas@utmn.ru>', // sender address
        to: 'marat.goya@gmail.com', // list of receivers
        subject: 'Новый результат опроса по семинарам и лекциям Школы', // Subject line
        // text: JSON.stringify(req.user), // plain text body
        html: '<b>' + JSON.stringify(req.session.id) + '<br/><br/>' + JSON.stringify(req.body) + '</b>' // html body
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
      });
    }
  });
  req.flash('info', 'Ваш результат принят. Благодарим за участие.');
  res.render('polls_anonymous', {messages: req.flash('info')})
});

app.get('/polls/2nd-module-electives', isLoggedIn, function(req, res) {

  res.render('2nd-module-electives', {user: req.user})
});

app.post('/polls/2nd-module-electives', function(req, res) {
  User.findOne({
    '_id': req.user._id
  }, function(err, user) {
    if (err)
      return done(err);

    if (user) {
      user.polls.ELECTIVES["2module__electives"].elective1 = req.body["elective1"];
      user.polls.ELECTIVES["2module__electives"].elective2 = req.body["elective2"];
      user.polls.ELECTIVES["2module__electives"].elective3 = req.body["elective3"];

      var now = new Date();
      user.polls.ELECTIVES["2module__electives"].time = now.toLocaleString('en-US', {timeZone: 'Asia/Yekaterinburg'});

      user.save(function(err, user) {
        if (err)
          return console.error(err);
        }
      );
    } else {
      console.log('There isn\'t such user in the database');
    }
  });
  req.flash('info', 'Ваш результат принят. Благодарим за участие.');
  let mailOptions = {
    from: '"SAS" <sas@utmn.ru>', // sender address
    to: 'marat.goya@gmail.com', // list of receivers
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

app.get('/polls/2nd-module-quantitative-methods', isLoggedIn, function(req, res) {

  res.render('2nd-module-quantitative-methods', {user: req.user})
});

app.post('/polls/2nd-module-quantitative-methods', function(req, res) {
  User.findOne({
    '_id': req.user._id
  }, function(err, user) {
    if (err)
      return done(err);

    if (user) {
      user.polls.ELECTIVES["2module__quantitative_methods"].value = req.body["quantitative_methods"];
      var now = new Date();
      user.polls.ELECTIVES["2module__quantitative_methods"].time = now.toLocaleString('en-US', {timeZone: 'Asia/Yekaterinburg'});

      user.save(function(err, user) {
        if (err)
          return console.error(err);
        }
      );
    } else {
      console.log('There isn\'t such user in the database');
    }
  });
  req.flash('info', `Ваш результат принят (Направление № ${req.body["quantitative_methods"]}). Благодарим за участие. Если вами было выбрано неверное значение, вы можете пройти опрос заново.`);
  let mailOptions = {
    from: '"SAS" <sas@utmn.ru>', // sender address
    to: 'marat.goya@gmail.com', // list of receivers
    subject: `${req.user.google.email} - ${req.body["quantitative_methods"]}`, // Subject line
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

app.post('/polls-ai-metaphor', function(req, res) {
  console.log(req.body);
  if (req.user) {

    User.findOne({
      '_id': req.user._id
    }, function(err, user) {
      if (err)
        return done(err);

      if (user) {
        user.polls.AI_Metaphor.LECTURES["Как хорошо были организованы материалы курса"] = parseInt(req.body["Как хорошо были организованы материалы курса"]);
        user.polls.AI_Metaphor.LECTURES["Насколько пунктуален был преподаватель (лекции)"] = parseInt(req.body["Насколько пунктуален был преподаватель (лекции)"]);
        user.polls.AI_Metaphor.LECTURES["Насколько полно преподаватель следовал программе курса"] = parseInt(req.body["Насколько полно преподаватель следовал программе курса"]);
        user.polls.AI_Metaphor.LECTURES["Оцените сложность лекций для вашего понимания"] = parseInt(req.body["Оцените сложность лекций для вашего понимания"]);
        user.polls.AI_Metaphor.LECTURES["Насколько новым для вас было содержание лекций"] = parseInt(req.body["Насколько новым для вас было содержание лекций"]);
        user.polls.AI_Metaphor.LECTURES["Насколько вам понравилась манера чтения лекций этим преподавателем"] = parseInt(req.body["Насколько вам понравилась манера чтения лекций этим преподавателем"]);
        user.polls.AI_Metaphor.LECTURES["Насколько изменились ваше мышление, знания и умения"] = parseInt(req.body["Насколько изменились ваше мышление, знания и умения"]);
        user.polls.AI_Metaphor.LECTURES["Хотите ли вы снова встретиться с этим преподавателем на других курсах"] = parseInt(req.body["Хотите ли вы снова встретиться с этим преподавателем на других курсах"]);
        user.polls.AI_Metaphor.LECTURES["Если бы этот курс не входил в ядро, взяли бы вы его как электив"] = parseInt(req.body["Если бы этот курс не входил в ядро, взяли бы вы его как электив"]);
        user.polls.AI_Metaphor.LECTURES["Что вам больше всего понравилось в этом лекционном курсе"] = req.body["Что вам больше всего понравилось в этом лекционном курсе"];
        user.polls.AI_Metaphor.LECTURES["Что вам больше всего не понравилось в этом лекционном курсе"] = req.body["Что вам больше всего не понравилось в этом лекционном курсе"];
        user.polls.AI_Metaphor.LECTURES["Что для вас было самым сложным в этом лекционном курсе"] = req.body["Что для вас было самым сложным в этом лекционном курсе"];
        user.polls.AI_Metaphor.LECTURES["Как бы вы порекомендовали улучшить этот лекционный курс"] = req.body["Как бы вы порекомендовали улучшить этот лекционный курс"];

        user.polls.AI_Metaphor.SEMINARS["Укажите имя и фамилию преподавателя, работавшего с вами на семинарах"] = req.body["Укажите имя и фамилию преподавателя, работавшего с вами на семинарах"];
        user.polls.AI_Metaphor.SEMINARS["Насколько полно преподаватель следовал темам"] = parseInt(req.body["Насколько полно преподаватель следовал темам"]);
        user.polls.AI_Metaphor.SEMINARS["Насколько хорошо преподаватель организует интерактивную коммуникацию в группе"] = parseInt(req.body["Насколько хорошо преподаватель организует интерактивную коммуникацию в группе"]);
        user.polls.AI_Metaphor.SEMINARS["Сколько раз в течение одного семинарского занятия вы (в среднем) высказывались вслух"] = parseInt(req.body["Сколько раз в течение одного семинарского занятия вы (в среднем) высказывались вслух"]);
        user.polls.AI_Metaphor.SEMINARS["Насколько хорошо преподаватель объясняет материал"] = parseInt(req.body["Насколько хорошо преподаватель объясняет материал"]);
        user.polls.AI_Metaphor.SEMINARS["Насколько семинарские занятия помогли вам освоить материал лекций"] = parseInt(req.body["Насколько семинарские занятия помогли вам освоить материал лекций"]);
        user.polls.AI_Metaphor.SEMINARS["Насколько пунктуален был преподаватель"] = parseInt(req.body["Насколько пунктуален был преподаватель"]);
        user.polls.AI_Metaphor.SEMINARS["Какую оценку (балл от 0 до 10) вы ожидаете получить за эту часть курса"] = parseInt(req.body["Какую оценку (балл от 0 до 10) вы ожидаете получить за эту часть курса"]);
        user.polls.AI_Metaphor.SEMINARS["Готовы ли вы снова встретиться с этим преподавателем на других курсах"] = parseInt(req.body["Готовы ли вы снова встретиться с этим преподавателем на других курсах"]);
        user.polls.AI_Metaphor.SEMINARS["Сколько процентов обязательных текстов по этой части курса вы успевали прочесть"] = parseInt(req.body["Сколько процентов обязательных текстов по этой части курса вы успевали прочесть"]);
        user.polls.AI_Metaphor.SEMINARS["Сколько часов в неделю вы уделяли внеаудиторной работе по этой части курса"] = parseInt(req.body["Сколько часов в неделю вы уделяли внеаудиторной работе по этой части курса"]);
        user.polls.AI_Metaphor.SEMINARS["Что вам больше всего понравилось в этом семинаре"] = req.body["Что вам больше всего понравилось в этом семинаре"];
        user.polls.AI_Metaphor.SEMINARS["Что вам больше всего не понравилось в этом семинаре"] = req.body["Что вам больше всего не понравилось в этом семинаре"];
        user.polls.AI_Metaphor.SEMINARS["Что для вас было самым сложным в этом семинаре"] = req.body["Что для вас было самым сложным в этом семинаре"];
        user.polls.AI_Metaphor.SEMINARS["Как бы вы порекомендовали улучшить этот семинар"] = req.body["Как бы вы порекомендовали улучшить этот семинар"];

        user.save(function(err, user) {
          if (err)
            return console.error(err);
          }
        );
      } else {
        console.log('There isn\'t such user in the database');
      }
    });
    req.flash('info', 'Ваш результат принят. Благодарим за участие.');
    let mailOptions = {
      from: '"SAS" <sas@utmn.ru>', // sender address
      to: 'marat.goya@gmail.com', // list of receivers
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
  } else {
    req.flash('info', 'Ваш результат принят. Благодарим за участие.');
    let mailOptions = {
      from: '"SAS" <sas@utmn.ru>', // sender address
      to: 'marat.goya@gmail.com', // list of receivers
      subject: 'Новый результат опроса по семинарам и лекциям Школы', // Subject line
      // text: JSON.stringify(req.user), // plain text body
      html: '<b>' + JSON.stringify(req.body) + '</b>' // html body
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
    });
    res.render('polls', {messages: req.flash('info')});
  }
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

app.post('/subscribe', function(req, res) {

  var email = req.body.email;
  console.log("Received new email: " + email);
  fs.readFile('public/assets/emails.txt', (err, data) => {
    if (err)
      console.log(err);
    fs.writeFile('public/assets/emails.txt', data + '\n' + email)
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"SAS" <sas@utmn.ru>', // sender address
    to: 'marat.goya@gmail.com', // list of receivers
    subject: 'Новый подписчик на рассылку Школы перспективных исследований', // Subject line
    text: email, // plain text body
    html: '<b>' + email + '</b>' // html body
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
  var results = now.toLocaleString('en-US', {timeZone: 'Asia/Yekaterinburg'}) + ' - ' + req.headers['x-forwarded-for'] + ': ' + req.body;
  console.log("Received new test result: " + results);
  fs.readFile('public/assets/results.txt', (err, data) => {
    if (err)
      console.log(err);
    fs.writeFile('public/assets/results.txt', data + '\n' + results)
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"SAS" <sas@utmn.ru>', // sender address
    to: 'marat.goya@gmail.com', // list of receivers
    subject: 'Новый результат опроса по открытым лекциям Школы', // Subject line
    text: results, // plain text body
    html: '<b>' + results + '</b>' // html body
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
  res.locals.error = err;
  // = req.app.get('env') === 'development'
  //   ? err
  //   : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
