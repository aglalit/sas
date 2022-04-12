module.exports = function(app, Session, User, transporter, isLoggedIn, logger){

// var passport = require('passport')
//   , LocalStrategy = require('passport-local').Strategy;
//
// passport.use(new LocalStrategy(
//   function(username, password, done) {
//       var user = {
//           "_id": {
//             "$oid": "5ce67440b9527900048faca4"
//         }
//       }
//       passport.serializeUser(function(user, done) {
//         done(null, user);
//       });
//
//       passport.deserializeUser(function(user, done) {
//           done(null, user);
//       });
//       if (username !== 'admin') {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (password !== 'P@ssw0rd') {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//   }
// ));
//
// app.post('/login-local',
//   passport.authenticate('local', { successRedirect: '/registration-list',
//                                    failureRedirect: '/login-local',
//                                    failureFlash: true })
// );
//
// app.get('/login-local', function(req, res) {
//   res.render('login-local')
// });


app.get('/registration-data', function(req, res) {
  var query = {};
  var queryFilter = {_id: 0, "google.name":1,"google.email":1};
  if (req.query.anon == 1) {
    queryFilter["google.name"] = 0;
    queryFilter["google.email"] = 0;
  }
  query['polls.' + req.query.field] = {
    $exists: true
  };
  if (req.query.regex) {
    var regex = new RegExp(req.query.regex)
    query['polls.' + req.query.field] = {
      $regex: regex
    };
  }
  queryFilter['polls.' + req.query.field] = true;

  if (req.query.users == 1){
    User.find(query, queryFilter).sort( { "_id": -1 } ).limit(1000).exec(function (err, docs){
      console.log(docs)
      if (err) {
        res.send(err);
        logger.error(err);
      }
      res.render('registration-data', {
        data: docs
      });
    });
  }
  else {
    Session.find(query, queryFilter).sort( { "_id": -1 } ).limit(1000).exec(function (err, docs){
      console.log(docs)
      if (err) {
        res.send(err);
        logger.error(err);
      }
      res.render('registration-data', {
        data: docs
      });
    });
  }
});

// app.post('/polls/registration-list', function(req, res) {
//   Session.findOne({
//     'session_id': req.session.id
//   }, function(err, session) {
//       return done(err);
//
//     if (session) {
//       parseSession (session, req, transporter);
//     } else {
//       var newSession = new Session();
//       parseSession (newSession, req, transporter);
//     }
//   });
//   req.flash('info', 'Благодарим за регистрацию.');
//   res.render('polls_anonymous', {messages: req.flash('info')})
// });

// function parseSession (sess, req, transporter){
//   var now = new Date();
//   sess.session_id = req.session.id;
// //   var keyNames = Object.keys(req.body);
// //   keyNames.forEach((el)=>{
// //     console.log(req.body[el]);
// //
// //       sess.polls.ba_2018_year1_the_city_as_text[el] = req.body[el];
// // });
//   let emailBody = '';
//   var bodyKeys = Object.keys(req.body);
//   for (let i=0;i<bodyKeys.length;i++){
//     emailBody += '<p><b>' + bodyKeys[i] + '</b>: ' + req.body[bodyKeys[i]] + '</p>';
//   }
//   let mailOptions = {
//     from: '"SAS" <sas@utmn.ru>', // sender address
//     to: 'm.agliulin@utmn.ru', // list of receivers
//     subject: 'SAS — Registration', // Subject line
//     // text: JSON.stringify(req.user), // plain text body
//     html: emailBody.toString() // html body
//   };
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       return console.log(error);
//     }
//     console.log('Message %s sent: %s', info.messageId, info.response);
//   });
//   sess.polls.registration = JSON.stringify(req.body);
//   sess.save(function(err) {
//     if (err)
//       return console.error(err);
//     return;
//   });
// }
}
