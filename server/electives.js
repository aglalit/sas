module.exports = function(app, Session, transporter){

app.get('/polls/great-books', function(req, res) {
  res.render('great-books', {user: req.user})
});

app.post('/polls/great-books', function(req, res) {
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
  req.flash('info', 'Ваш результат принят. Благодарим за участие.');
  res.render('polls_anonymous', {messages: req.flash('info')})
});

function parseSession (sess, req, transporter){
  var now = new Date();
  sess.session_id = req.session.id;
  sess.polls.electives_3_18.time = now.toLocaleString('en-US', {timeZone: 'Asia/Yekaterinburg'});
  sess.polls.electives_3_18["Укажите имя и фамилию преподавателя, работавшего с вами на семинарах"] = req.body["Укажите имя и фамилию преподавателя, работавшего с вами на семинарах"];
  sess.polls.electives_3_18["Как хорошо были организованы материалы курса"] = req.body["Как хорошо были организованы материалы курса"];
  sess.polls.electives_3_18["Сколько процентов обязательных текстов по этой части курса вы успевали прочесть"] = req.body["Сколько процентов обязательных текстов по этой части курса вы успевали прочесть"];
  sess.polls.electives_3_18["Какой из прочитанных текстов оказал на вас наибольшее влияние? Почему?"] = req.body["Какой из прочитанных текстов оказал на вас наибольшее влияние? Почему?"];
  sess.polls.electives_3_18["Насколько полно преподаватель следовал программе курса"] = req.body["Насколько полно преподаватель следовал программе курса"];
  sess.polls.electives_3_18["Оцените сложность лекций для вашего понимания"] = req.body["Оцените сложность лекций для вашего понимания"];
  sess.polls.electives_3_18["Насколько новым для вас было содержание лекций"] = req.body["Насколько новым для вас было содержание лекций"];
  sess.polls.electives_3_18["Насколько изменились ваше мышление, знания и умения"] = req.body["Насколько изменились ваше мышление, знания и умения"];
  sess.polls.electives_3_18["Насколько хорошо преподаватель объясняет материал"] = req.body["Насколько хорошо преподаватель объясняет материал"];
  sess.polls.electives_3_18["Насколько хорошо преподаватель организует интерактивную коммуникацию в группе"] = req.body["Насколько хорошо преподаватель организует интерактивную коммуникацию в группе"];
  sess.polls.electives_3_18["Хотите ли вы снова встретиться с этим преподавателем на других курсах?"] = req.body["Хотите ли вы снова встретиться с этим преподавателем на других курсах?"];
  sess.polls.electives_3_18["Что вам больше всего понравилось в этом лекционном курсе"] = req.body["Что вам больше всего понравилось в этом лекционном курсе"];
  sess.polls.electives_3_18["Что вам больше всего не понравилось в этом лекционном курсе"] = req.body["Что вам больше всего не понравилось в этом лекционном курсе"];
  sess.polls.electives_3_18["Что для вас было самым сложным в этом лекционном курсе"] = req.body["Что для вас было самым сложным в этом лекционном курсе"];
  sess.polls.electives_3_18["Как бы вы порекомендовали улучшить этот лекционный курс"] = req.body["Как бы вы порекомендовали улучшить этот лекционный курс"];

  sess.save(function(err) {
    if (err)
      return console.error(err);
    return;
  });
  let mailOptions = {
    from: '"SAS" <sas@utmn.ru>', // sender address
    to: 'marat.goya@gmail.com, e.samokhvalova@utmn.ru', // list of receivers
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
};
