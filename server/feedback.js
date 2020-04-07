module.exports = function(app, Session, transporter, logger){

app.get('/feedback', function(req, res) {
  var query = {};

  if (req.query.s === 'ba_2019_electives'){
    Session.find({
      $or: [
        { "polls.ba_2019_year1_module4_electives": {$exists : true} },
        { "polls.ba_2019_year2_module8_electives": {$exists : true} },
        { "polls.ba_2019_year2_module8_electives2": {$exists : true} }
      ]
    },{ 'polls.ba_2019_year1_module4_electives': 1, 'polls.ba_2019_year2_module8_electives': 1,'polls.ba_2019_year2_module8_electives2': 1 }).exec(function (err, docs){
      if (err) { res.send(err); console.log(err); }
      else {
        docs.map((el)=>{console.log(el._doc.polls)});
        res.render('feedback', {
          data:  JSON.stringify(docs)
        });
      }
    });
  }
  else if (req.query.s === 'all'){
    Session.find({$and: [
      {'polls':{$exists : true}},
      {'polls.registration':{$exists : false}},
      {'polls.faculty_research_trips':{$exists : false}}
    ]}).select('polls').select('polls').sort({ _id: -1 }).limit(1500).exec(function (err, docs){
      if (err) { res.send(err); console.log(err); }
      else {
        res.render('feedback', {
          data:  JSON.stringify(docs)
        });
      }
    });
  }
  else {
    query['polls.' + req.query.s] = {$exists : true};
    Session.find(query).select('polls.' + req.query.s).exec(function (err, docs){
      if (err) { res.send(err); console.log(err); }
      else {
        console.log(docs);
        res.render('feedback', {
          data:  JSON.stringify(docs)
        });
      }
    });
  }



});

app.get('/feedback2', function(req, res) {
  var query = {};

  if (req.query.s === 'ba_2019_electives'){
    Session.find({
      $or: [
        { "polls.ba_2019_module1_elective1": {$exists : true} },
        { "polls.ba_2019_module1_elective2": {$exists : true} },
        { "polls.ba_2019_module1_elective3": {$exists : true} },
        { "polls.ba_2019_module1_major1": {$exists : true} },
        { "polls.ba_2019_module1_major2": {$exists : true} }
      ]
    },{ 'polls.ba_2019_module1_elective1': 1, 'polls.ba_2019_module1_elective2': 1,'polls.ba_2019_module1_elective3': 1,'polls.ba_2019_module1_major1': 1,'polls.ba_2019_module1_major2': 1 }).exec(function (err, docs){
      if (err) { res.send(err); console.log(err); }
      else {
        docs.map((el)=>{console.log(el._doc.polls)});
        res.render('feedback2', {
          data:  JSON.stringify(docs)
        });
      }
    });
  }
  else if (req.query.s === 'ba_2019_year2_module5_poms'){
    Session.find({
      $or: [
        { "polls.ba_2019_year2_module5_poms_louis": {$exists : true} },
        { "polls.ba_2019_year2_module5_poms_krishna": {$exists : true} },
        { "polls.ba_2019_year2_module5_poms_juliette": {$exists : true} }
      ]
    },{ 'polls.ba_2019_year2_module5_poms_louis': 1, 'polls.ba_2019_year2_module5_poms_krishna': 1,'polls.ba_2019_year2_module5_poms_juliette': 1 }).exec(function (err, docs){
      if (err) { res.send(err); console.log(err); }
      else {
        docs.map((el)=>{console.log(el._doc.polls)});
        res.render('feedback2', {
          data:  JSON.stringify(docs)
        });
      }
    });
  }
  else if (req.query.s === 'all'){
    Session.find({$and: [
      {'polls':{$exists : true}},
      {'polls.registration':{$exists : false}},
      {'polls.faculty_research_trips':{$exists : false}}
    ]}).select('polls').select('polls').sort({ _id: -1 }).limit(2500).exec(function (err, docs){
      if (err) { res.send(err); console.log(err); }
      else {
        res.render('feedback2', {
          data:  JSON.stringify(docs)
        });
      }
    });
  }
  else {
    query['polls.' + req.query.s] = {$exists : true};
    Session.find(query).select('polls.' + req.query.s).exec(function (err, docs){
      if (err) { res.send(err); console.log(err); }
      else {
        console.log(docs);
        res.render('feedback2', {
          data:  JSON.stringify(docs)
        });
      }
    });
  }



});

app.get('/feedback3', function(req, res) {
  var query = {};

  if (req.query.s === 'ba_2019_q2_electives'){
    Session.find({
      $or: [
        { "polls.ba_2019_q2_elective1": {$exists : true} },
        { "polls.ba_2019_q2_elective2": {$exists : true} },
        { "polls.ba_2019_q2_elective3": {$exists : true} },
        { "polls.ba_2019_q2_major1": {$exists : true} },
        { "polls.ba_2019_q2_major2": {$exists : true} }
      ]
    },{ 'polls.ba_2019_q2_elective1': 1, 'polls.ba_2019_q2_elective2': 1,'polls.ba_2019_q2_elective3': 1,'polls.ba_2019_q2_major1': 1,'polls.ba_2019_q2_major2': 1 }).exec(function (err, docs){
      if (err) { res.send(err); console.log(err); }
      else {
        docs.map((el)=>{console.log(el._doc.polls)});
        res.render('feedback3', {
          data:  JSON.stringify(docs)
        });
      }
    });
  }
  else if (req.query.s === 'ba_2019_year2_q2_poms'){
    Session.find({
      $or: [
        { "polls.ba_2019_year2_q2_poms_louis": {$exists : true} },
        { "polls.ba_2019_year2_q2_poms_krishna": {$exists : true} },
        { "polls.ba_2019_year2_q2_poms_juliette": {$exists : true} }
      ]
    },{ 'polls.ba_2019_year2_q2_poms_louis': 1, 'polls.ba_2019_year2_q2_poms_krishna': 1,'polls.ba_2019_year2_q2_poms_juliette': 1 }).exec(function (err, docs){
      if (err) { res.send(err); console.log(err); }
      else {
        docs.map((el)=>{console.log(el._doc.polls)});
        res.render('feedback3', {
          data:  JSON.stringify(docs)
        });
      }
    });
  }
  else if (req.query.s === 'all'){
    Session.find({$and: [
      {'polls':{$exists : true}},
      {'polls.registration':{$exists : false}},
      {'polls.faculty_research_trips':{$exists : false}}
    ]}).select('polls').select('polls').sort({ _id: -1 }).limit(750).exec(function (err, docs){
      if (err) { res.send(err); console.log(err); }
      else {
        res.render('feedback3', {
          data:  JSON.stringify(docs)
        });
      }
    });
  }
  else {
    query['polls.' + req.query.s] = {$exists : true};
    Session.find(query).select('polls.' + req.query.s).exec(function (err, docs){
      if (err) { res.send(err); console.log(err); }
      else {
        console.log(docs);
        res.render('feedback3', {
          data:  JSON.stringify(docs)
        });
      }
    });
  }



});

app.get('/feedback4', function(req, res) {
  var query = {};

  if (req.query.s === 'ba_2019_q2_electives'){
    Session.find({
      $or: [
        { "polls.ba_2019_q2_elective1": {$exists : true} },
        { "polls.ba_2019_q2_elective2": {$exists : true} },
        { "polls.ba_2019_q2_major3": {$exists : true} },
        { "polls.ba_2019_q2_major1": {$exists : true} },
        { "polls.ba_2019_q2_major2": {$exists : true} }
      ]
    },{ 'polls.ba_2019_q2_elective1': 1, 'polls.ba_2019_q2_elective2': 1,'polls.ba_2019_q2_major3': 1,'polls.ba_2019_q2_major1': 1,'polls.ba_2019_q2_major2': 1 }).exec(function (err, docs){
      if (err) { res.send(err); console.log(err); }
      else {
        docs.map((el)=>{console.log(el._doc.polls)});
        res.render('feedback4', {
          data:  JSON.stringify(docs)
        });
      }
    });
  }
  else if (req.query.s === 'all'){
    Session.find({$and: [
      {'polls':{$exists : true}},
      {'polls.registration':{$exists : false}},
      {'polls.faculty_research_trips':{$exists : false}}
    ]}).select('polls').select('polls').sort({ _id: -1 }).limit(750).exec(function (err, docs){
      if (err) { res.send(err); console.log(err); }
      else {
        res.render('feedback4', {
          data:  JSON.stringify(docs)
        });
      }
    });
  }
  else {
    query['polls.' + req.query.s] = {$exists : true};
    Session.find(query).select('polls.' + req.query.s).exec(function (err, docs){
      if (err) { res.send(err); console.log(err); }
      else {
        console.log(docs);
        res.render('feedback4', {
          data:  JSON.stringify(docs)
        });
      }
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
