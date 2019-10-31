module.exports = function(app, Session, transporter, isLoggedIn, User, logger){

var name;
var email;

app.get('/polls/planned-absences-students', function(req, res) {
  res.render('planned-absences-students', {user: req.user})
});

app.post('/polls/planned-absences-students', function(req, res) {
  User.findOne({
    '_id': req.user._id
  }, function(err, user) {
    if (err)
      logger.error(err);
      console.log(err);

    if (user) {
      req.body.name = user.google.name;
      req.body.email = user.google.email;
    } else {
      console.log('There isn\'t such user in the database');
    }

    Session.findOne({
      'session_id': req.session.id
    }, function(err, session) {
      if (err)
        logger.error(err);
        console.log(err);

      if (session) {
        parseSession(session, req, transporter);
      } else {
        var newSession = new Session();
        parseSession(newSession, req, transporter);
      }
    });
  });

  req.flash('info', 'Thank you! Your form was successfully submitted.');
  res.render('polls_anonymous', {messages: req.flash('info')})
});

function parseSession (sess, req, transporter){
  var now = new Date();
  sess.session_id = req.session.id;
//   var keyNames = Object.keys(req.body);
//   keyNames.forEach((el)=>{
//     console.log(req.body[el]);
//
//       sess.polls.ba_2018_year1_the_city_as_text[el] = req.body[el];
// });
  sess.polls.planned_absences_students = JSON.stringify(req.body);
  sess.save(function(err) {
    if (err)
      return console.error(err);
    return;
  });
  let emailBody = '';
  var attachments = [];
  if (req.files){
    if(req.files["Documentation"]) {attachments.push({filename: req.files["Documentation"].name, content:req.files["Documentation"].data});}
  }

  var bodyKeys = Object.keys(req.body);

  for (let i=0;i<bodyKeys.length;i++){
    emailBody += '<p><b>' + bodyKeys[i] + '</b>: ' + req.body[bodyKeys[i]] + '</p>';
  }

  let mailOptions = {
    from: '"SAS" <sas@utmn.ru>', // sender address
    to: 'm.agliulin@utmn.ru', // list of receivers
    subject: "SAS — Student's Planned Absence", // Subject line
    // text: JSON.stringify(req.user), // plain text body
    html: emailBody.toString(),
    attachments: attachments
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
}
}
