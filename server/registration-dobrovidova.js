module.exports = function(app, Session, transporter){

var fileUpload = require("express-fileupload");

app.use(fileUpload());

app.get('/polls/registration-dobrovidova', function(req, res) {
  res.render('registration-dobrovidova', {user: req.user})
});

app.post('/polls/registration-dobrovidova', function(req, res) {
  Session.findOne({
    'session_id': req.session.id
  }, function(err, session) {
    if (err)
      return done(err);

    if (session) {
      parseSession (session, req, transporter);
    } else {
      var newSession = new Session();
      parseSession (newSession, req, transporter);
    }
  });
  req.flash('info', 'Благодарим за регистрацию.');
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
  sess.polls.registration_dobrovidova = JSON.stringify(req.body);
  sess.save(function(err) {
    if (err)
      return console.error(err);
    return;
  });
  let emailBody = '';
  var attachments = [];
  if (req.files){
    if(req.files["letter"]) {attachments.push({filename: req.files["letter"].name, content:req.files["letter"].data});}
  }
  var bodyKeys = Object.keys(req.body);

  for (let i=0;i<bodyKeys.length;i++){
    emailBody += '<p><b>' + bodyKeys[i] + '</b>: ' + req.body[bodyKeys[i]] + '</p>';
  }

  let mailOptions = {
    from: '"SAS" <sas@utmn.ru>', // sender address
    to: 'm.agliulin@utmn.ru', // list of receivers
    subject: 'SAS — registration (Dobrovidova)', // Subject line
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
