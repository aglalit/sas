"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cors_1 = require("cors");
var express_subdomain_1 = require("express-subdomain");
var path_1 = require("path");
var serve_favicon_1 = require("serve-favicon");
var morgan_1 = require("morgan");
var compression_1 = require("compression");
var cookie_parser_1 = require("cookie-parser");
var body_parser_1 = require("body-parser");
var nodemailer_1 = require("nodemailer");
var querystring_1 = require("querystring");
var mongoose_1 = require("mongoose");
var passport_1 = require("passport");
var winston_1 = require("winston");
var dotenv_1 = require("dotenv");
var connect_flash_1 = require("connect-flash");
var index_1 = require("./routes/index");
var connect_mongo_1 = require("connect-mongo");
dotenv_1.config();
var app = express_1.default();
var router = express_1.default.Router();
var express_fileupload_1 = require("express-fileupload");
var express_session_1 = require("express-session");
var MongoStore = connect_mongo_1.default(express_session_1.default);
var user_1 = require("./models/user");
var session_1 = require("./models/session");
var schedule_1 = require("./models/schedule");
var logger = winston_1.default.createLogger({
    level: 'error',
    format: winston_1.default.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log`
        // - Write all logs error (and below) to `error.log`.
        //
        new winston_1.default.transports.File({ filename: './public/error.log', level: 'error' }),
        new winston_1.default.transports.File({ filename: './public/combined.log' })
    ]
});
// logger.error('Error log:');
var promise = mongoose_1.default.connect(process.env.MONGODB_URI, { useNewUrlParser: true }).then(function () {
    console.log('Database is connected');
}, function (err) {
    logger.error(err);
    console.log('Can not connect to the database' + err);
});
// Connection URL
var GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
var GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
// Use connect method to connect to the server
var db = mongoose_1.default.connection;
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
var user = process.env.TRANSPORTER;
var pass = process.env.TRANSPORTER_PASSWORD;
// create reusable transporter object using the default SMTP transport
var transporter = nodemailer_1.default.createTransport({
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
    }
    else {
        console.log('Server is ready to take our messages');
    }
});
var officeuser = process.env.OFFICETRANSPORTER;
var officepass = process.env.OFFICETRANSPORTER_PASSWORD;
var officeTransporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: officeuser,
        pass: officepass
    },
    debug: true
});
app.set('port', (process.env.PORT || 5000));
// view engine setup
app.set('views', [
    path_1.default.join(__dirname, 'views'),
    path_1.default.join(__dirname, 'views/polls/')
]);
app.set('view engine', 'pug');
// uncomment after placing your favicon in /public
app.use(serve_favicon_1.default(path_1.default.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan_1.default('dev'));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
var corsOptions = {
    origin: 'https://sas.utmn.ru',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors_1.default(corsOptions));
// required for passport
app.use(express_session_1.default({
    secret: 'schoolofadvancedstudiessecret',
    cookie: { maxAge: 60000000 },
    store: new MongoStore({ mongooseConnection: mongoose_1.default.connection, collection: 'sessions_storage' })
})); // session secret
app.use(passport_1.default.initialize());
app.use(passport_1.default.session()); // persistent login sessions
require('./config/passport')(passport_1.default);
app.use(connect_flash_1.default()); // use connect-flash for flash messages stored in session
app.use(express_fileupload_1.default());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(compression_1.default());
app.use('/', index_1.default);
app.use(express_subdomain_1.default('advanced', router));
app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});
app.get('/auth/google', checkReturnTo, passport_1.default.authenticate('google', {
    scope: ['profile', 'email']
}));
app.get('/auth/google/callback', passport_1.default.authenticate('google', {
    successReturnToOrRedirect: '/polls',
    failureRedirect: '/login'
}));
app.get('/polls', isLoggedIn, function (req, res) {
    res.render('polls', { user: req.user });
});
app.get('/polls-anonymous', function (req, res) {
    res.render('polls_anonymous', { messages: req.flash('info') });
});
function checkReturnTo(req, res, next) {
    var returnTo = req.query.returnTo;
    if (returnTo) {
        // Maybe unnecessary, but just to be sure.
        req.session = req.session || {};
        // Set returnTo to the absolute path you want to be redirect to after the authentication succeeds.
        req.session.returnTo = req.baseUrl + querystring_1.default.unescape(returnTo);
    }
    next();
}
require('./server/gi_part6.js')(app, session_1.default, transporter);
require('./server/feminism.js')(app, session_1.default, transporter);
require('./server/great-books.js')(app, session_1.default, transporter);
require('./server/electives.js')(app, session_1.default, transporter);
require('./server/tfy.js')(app, session_1.default, transporter);
require('./server/mailing.js')(app, session_1.default, officeTransporter, logger);
require('./server/electives_2019_1_1st_year.js')(app, session_1.default, transporter, isLoggedIn, user_1.default);
require('./server/electives_2019_1_2nd_year.js')(app, session_1.default, transporter, isLoggedIn, user_1.default);
require('./server/electives_2019_2_1st_year.js')(app, session_1.default, transporter, isLoggedIn, user_1.default);
require('./server/electives_2019_2_2nd_year.js')(app, session_1.default, transporter, isLoggedIn, user_1.default);
require('./server/electives_2019_4.js')(app, session_1.default, transporter, isLoggedIn, user_1.default);
require('./server/electives_2020_1.js')(app, session_1.default, transporter, isLoggedIn, user_1.default);
require('./server/ba_2018_quantitative_methods.js')(app, session_1.default, transporter, isLoggedIn, user_1.default);
require('./server/ba_2018_history.js')(app, session_1.default, transporter, isLoggedIn, user_1.default);
require('./server/pds_2019_classes.js')(app, session_1.default, transporter, isLoggedIn, user_1.default);
require('./server/ma_2018_fedorova.js')(app, session_1.default, transporter);
require('./server/ma_2018_chubarov.js')(app, session_1.default, transporter);
require('./server/ma_2018_strukov.js')(app, session_1.default, transporter);
require('./server/ma_2018_apostolov.js')(app, session_1.default, transporter);
require('./server/ma_2018_art.js')(app, session_1.default, transporter);
require('./server/ma_2018_utkin.js')(app, session_1.default, transporter);
require('./server/ma_2019_smirnov.js')(app, session_1.default, transporter);
require('./server/ma_2019_manirko.js')(app, session_1.default, transporter);
require('./server/ma_2019_vetushinsky.js')(app, session_1.default, transporter);
require('./server/ma_2019_wolf.js')(app, session_1.default, transporter);
require('./server/ma_2018_dobrovidova.js')(app, session_1.default, transporter);
require('./server/ba_2018_year1_module1_wtai.js')(app, session_1.default, transporter);
require('./server/ba_2018_year2_module1_aw.js')(app, session_1.default, transporter);
require('./server/ba_2018_year2_module1_electives.js')(app, session_1.default, transporter);
require('./server/ba_2018_year2_module5_art.js')(app, session_1.default, transporter);
require('./server/ba_2018_year1_the_city_as_text.js')(app, session_1.default, transporter);
require('./server/ba_2018_year2_module5_poms.js')(app, session_1.default, transporter);
require('./server/ba_2018_year2_gi_preliminary.js')(app, session_1.default, transporter);
require('./server/the-city-as-text-2018-video.js')(app, session_1.default, transporter, isLoggedIn, user_1.default);
require('./server/sas-schedule.js')(app);
require('./server/faculty-trips.js')(app, session_1.default, transporter);
require('./server/faculty-research-trips.js')(app, session_1.default, transporter);
require('./server/planned-absences-professors.js')(app, session_1.default, transporter, isLoggedIn, user_1.default, logger);
require('./server/planned-absences-students.js')(app, session_1.default, transporter, isLoggedIn, user_1.default, logger);
require('./server/registration-dobrovidova.js')(app, session_1.default, transporter);
require('./server/open-day-2018.js')(app, session_1.default, transporter);
require('./server/open-day-2018-voting.js')(app, session_1.default, transporter);
require('./server/open-day-03-2020.js')(app, session_1.default, transporter);
require('./server/pds-2019.js')(app, session_1.default, transporter);
require('./server/registration.js')(app, session_1.default, transporter);
require('./server/registration-xhe.js')(app, session_1.default, transporter);
require('./server/registration-media.js')(app, session_1.default, transporter);
require('./server/registration-prospective-students.js')(app, session_1.default, transporter);
require('./server/vue_test.js')(app, session_1.default, transporter);
require('./server/poetry.js')(app, session_1.default, transporter);
require('./server/unsubscribe.js')(app, session_1.default, transporter);
require('./server/ba_2018_year1_module2_qm.js')(app, session_1.default, transporter);
require('./server/ba_2018_year1_module2_history.js')(app, session_1.default, transporter);
require('./server/ba_2018_year1_module2_gb_ru.js')(app, session_1.default, transporter);
require('./server/ba_2018_year1_module2_gb_en.js')(app, session_1.default, transporter);
require('./server/ba_2018_year1_module2_gi.js')(app, session_1.default, transporter);
require('./server/ba_2018_year2_module6_aw.js')(app, session_1.default, transporter);
require('./server/ba_2018_year2_module6_electives.js')(app, session_1.default, transporter);
require('./server/ba_2018_year1_module2_electives.js')(app, session_1.default, transporter);
require('./server/ba_2018_year1_module2_english.js')(app, session_1.default, transporter);
require('./server/ba_2019_year1_module3_qm.js')(app, session_1.default, transporter);
require('./server/ba_2019_year1_module3_history.js')(app, session_1.default, transporter);
require('./server/ba_2019_year1_module3_gb.js')(app, session_1.default, transporter);
require('./server/ba_2019_year1_module3_gi.js')(app, session_1.default, transporter);
require('./server/ba_2019_year2_module7_gb.js')(app, session_1.default, transporter);
require('./server/ba_2019_year1_module3_electives.js')(app, session_1.default, transporter);
require('./server/ba_2019_year2_module7_electives.js')(app, session_1.default, transporter);
require('./server/ba_2019_year2_module7_electives2.js')(app, session_1.default, transporter);
require('./server/majors.js')(app, session_1.default, transporter, isLoggedIn, user_1.default);
require('./server/kontowski.js')(app, session_1.default, transporter, isLoggedIn, user_1.default);
require('./server/erpyleva.js')(app, session_1.default, transporter, isLoggedIn, user_1.default);
require('./server/gi_topics_2020.js')(app, session_1.default, transporter, isLoggedIn, user_1.default);
require('./server/registration-data.js')(app, session_1.default, transporter, isLoggedIn, logger);
require('./server/feedback.js')(app, session_1.default, user_1.default, transporter, isLoggedIn, logger);
require('./server/feedback-collector.js')(app, session_1.default, transporter, officeTransporter, isLoggedIn, user_1.default, logger);
require('./server/feedback-collector-anonymous.js')(app, session_1.default, transporter, officeTransporter, logger);
require('./server/db_export.js')(app, session_1.default, user_1.default);
require('./server/schedule_data.js')(app, schedule_1.default, logger);
// 4th MODULE 2019
require('./server/ba_2019_year1_module4_electives.js')(app, session_1.default, transporter, officeTransporter, isLoggedIn, user_1.default, logger);
require('./server/ba_2019_year1_module4_tfy.js')(app, session_1.default, transporter, officeTransporter, isLoggedIn, user_1.default, logger);
require('./server/ba_2019_year1_module4_it.js')(app, session_1.default, transporter, officeTransporter, isLoggedIn, user_1.default, logger);
require('./server/ba_2019_year1_module4_gb.js')(app, session_1.default, transporter, officeTransporter, isLoggedIn, user_1.default, logger);
require('./server/ba_2019_year1_module4_history.js')(app, session_1.default, transporter, officeTransporter, isLoggedIn, user_1.default, logger);
require('./server/ba_2019_year2_module8_gb.js')(app, session_1.default, transporter, officeTransporter, isLoggedIn, user_1.default, logger);
require('./server/ba_2019_year2_module8_electives.js')(app, session_1.default, transporter, officeTransporter, isLoggedIn, user_1.default, logger);
require('./server/ba_2019_year2_module8_electives2.js')(app, session_1.default, transporter, officeTransporter, isLoggedIn, user_1.default, logger);
require('./server/ba_2019_year2_module8_design_thinking.js')(app, session_1.default, transporter, officeTransporter, isLoggedIn, user_1.default, logger);
app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/polls');
});
function isLoggedIn(req, res, next) {
    // DEV
    //return next();
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
        console.log(req.isAuthenticated());
        console.log('isAuthenticated');
        return next();
    }
    // if they aren't redirect them to the home page
    console.log(req.isAuthenticated());
    res.redirect('/login?returnTo=' + querystring_1.default.escape(req.url));
}
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
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
    //  ? err
    //  : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
module.exports = app;
//# sourceMappingURL=index.js.map