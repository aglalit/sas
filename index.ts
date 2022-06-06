const express = require('express');
const cors = require('cors');
const subdomain = require('express-subdomain');
const path = require('path');
const favicon = require('serve-favicon');
const loggerMorgan = require('morgan');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const querystring = require('querystring');
const mongoose = require('mongoose');
const passport = require('passport');
const winston = require('winston');
const config = require("dotenv").config;
config();
const flash = require("connect-flash");
const index = require("./routes/index");
const connect_mongo = require("connect-mongo");
let app = express();
let router = express.Router();

const fileUpload = require('express-fileupload');

const session = require('express-session');

const MongoStore = connect_mongo(session);
const User = require('./models/user');
const Session = require('./models/session');
const Schedule = require('./models/schedule');

let logger = winston.createLogger({
 level: 'error',
 format: winston.format.json(),
 defaultMeta: { service: 'user-service' },
 transports: [
 //
 // - Write to all logs with level `info` and below to `combined.log`
 // - Write all logs error (and below) to `error.log`.
 //
 new winston.transports.File({ filename: './public/error.log', level: 'error' }),
 new winston.transports.File({ filename: './public/combined.log' })
 ]
});
// logger.error('Error log:');

const promise = mongoose.connect(process.env.MONGODB_URI.toString()
 , {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}).then(
 () => {
 console.log('Database is connected');
 },
 err => {
 logger.error(err);
 console.log('Can not connect to the database' + err);
 }
);


// Connection URL
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
// Use connect method to connect to the server
const db = mongoose.connection;

promise.then(function (db) {
 db.on('error', function (error) {
 console.error.bind(console, 'connection error:');
 logger.error(error);
 });
 db.on('open', function () {
 logger.error('Mongo is connected');
 console.log('Mongo is connected');
 });
});

const user = process.env.TRANSPORTER;
const pass = process.env.TRANSPORTER_PASSWORD;
// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
 user: user,
 pass: pass
 },
 debug: true
});
transporter.verify(function (error, success) {
 if (error) {
 console.log(error);
 logger.error(error);
 } else {
 console.log(`${user}: server is ready to take our messages`);
 }
});

const officeuser = process.env.OFFICETRANSPORTER;
const officepass = process.env.OFFICETRANSPORTER_PASSWORD;

const officeTransporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
 user: officeuser,
 pass: officepass
 },
 debug: true,
 pool: true,
 maxMessages: 300,
 maxConnections: 3
});

officeTransporter.verify(function (error, success) {
 if (error) {
 console.log(error);
 logger.error(error);
 } else {
 console.log(`${officeuser}: server is ready to take our messages`);
 }
});

const marketinguser = process.env.MARKETINGTRANSPORTER;
const marketingpass = process.env.MARKETINGTRANSPORTER_PASSWORD;

const marketingTransporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
 user: marketinguser,
 pass: marketingpass
 },
 debug: true
});

marketingTransporter.verify(function (error, success) {
 if (error) {
 console.log(error);
 logger.error(error);
 } else {
 console.log(`${marketinguser}: server is ready to take our messages`);
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
app.use(loggerMorgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const corsOptions = {
 origin: 'https://sas.utmn.ru',
 optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

// required for passport
app.use(session({
 secret: 'schoolofadvancedstudiessecret',
 cookie: { maxAge: 600000000 },
 store: new MongoStore({ mongooseConnection: mongoose.connection, collection: 'sessions_storage' }),
 resave: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
require('./config/passport')(passport);
app.use(flash()); // use connect-flash for flash messages stored in session

app.use(fileUpload());

app.use(express.static(path.join(__dirname, 'public')));

app.use(compression());

app.use('/', index);
app.use(subdomain('advanced', router));

app.listen(app.get('port'), function () {
 console.log('Node app is running on port', app.get('port'));
});

app.get('/auth/google', checkReturnTo, passport.authenticate('google', {
 scope: ['profile', 'email']
}));

app.get('/auth/google/callback', passport.authenticate('google', {
 successReturnToOrRedirect: '/polls',
 failureRedirect: '/login'
}));

app.get('/polls', isLoggedIn, function (req, res) {
 res.render('polls', { user: req.user });
});

app.get('/polls-anonymous', function (req, res) {
 res.render('polls_anonymous', { messages: req.flash('info') });
});

app.get('/sas-folder-tree', isLoggedIn, function(req, res, next) {
  res.sendFile('views/sas-folder-tree.html', {root: __dirname });
});

function checkReturnTo (req, res, next) {
 let returnTo = req.query.returnTo;
 if (returnTo) {
 // Maybe unnecessary, but just to be sure.
 req.session = req.session || {};

 // Set returnTo to the absolute path you want to be redirect to after the authentication succeeds.
 req.session.returnTo = req.baseUrl + querystring.unescape(returnTo);
 }
 next();
}

require('./server/electives_2020_1.js')(app, Session, transporter, isLoggedIn, User, logger);
require('./server/mailing.js')(app, Session, officeTransporter, logger);

require('./server/sas-schedule.js')(app);
require('./server/faculty-trips.js')(app, Session, transporter);
require('./server/faculty-research-trips.js')(app, Session, transporter);
require('./server/planned-absences-professors.js')(app, Session, transporter, isLoggedIn, User, logger);
require('./server/planned-absences-students.js')(app, Session, transporter, isLoggedIn, User, logger);

require('./server/open-day-04-2022.js')(app, Session, transporter);
require('./server/registration.js')(app, Session, transporter);
require('./server/registration-xhe.js')(app, Session, transporter);
require('./server/registration-xhe-open-day.js')(app, Session, transporter);
require('./server/excellence-track.js')(app, Session, transporter);

require('./server/dare-to-x-registration.js')(app, Session, transporter);
require('./server/registration-prospective-students.js')(app, Session, transporter, marketingTransporter);

require('./server/vue_test.js')(app, Session, transporter);

require('./server/poetry.js')(app, Session, transporter);
require('./server/unsubscribe.js')(app, Session, transporter);

require('./server/majors.js')(app, Session, transporter, isLoggedIn, User);
require('./server/kontowski.js')(app, Session, transporter, isLoggedIn, User);
require('./server/candidates.js')(app, Session, transporter, isLoggedIn, User);

require('./server/gi_topics_2020.js')(app, Session, transporter, isLoggedIn, User);

require('./server/registration-data.js')(app, Session, User, transporter, isLoggedIn, logger);
require('./server/feedback.js')(app, Session, User, transporter, isLoggedIn, logger);
require('./server/feedback-collector-anonymous.js')(app, Session, transporter, officeTransporter, logger);

require('./server/db_export.js')(app, Session, User);
require('./server/schedule_data.js')(app, Schedule, logger);

require('./server/feedback-collector.js')(app, Session, transporter, officeTransporter, isLoggedIn, User, logger);

app.get('/logout', function (req, res) {
 req.logout();
 res.redirect('/polls');
});

function isLoggedIn (req, res, next) {
 // DEV
 if (process.env.NODE_ENV === 'development'){
   return next();
 }

 // if user is authenticated in the session, carry on
 if (req.isAuthenticated()) {
 console.log(req.isAuthenticated());
 console.log('isAuthenticated');
 return next();
 }

 // if they aren't redirect them to the home page
 console.log(req.isAuthenticated());
 res.redirect('/login?returnTo=' + querystring.escape(req.url));
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
 let err = new Error('Not Found');
 // @ts-ignore
 err.status = 404;
 next(err);
});

// error handler
app.use(function (err, req, res, next) {
 // set locals, only providing error in development
 res.locals.message = err.message;
 res.locals.error = err;
 // = req.app.get('env') === 'development'
 // ? err
 // : {};

 // render the error page
 res.status(err.status || 500);
 res.render('error');
});

module.exports = app;
