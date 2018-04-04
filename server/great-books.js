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
  sess.polls.great_books_3_17.time = now.toLocaleString('en-US', {timeZone: 'Asia/Yekaterinburg'});
  session.polls.great_books_3_17["Укажите имя и фамилию преподавателя, работавшего с вами на семинарах"] = req.body["Укажите имя и фамилию преподавателя, работавшего с вами на семинарах"];
  session.polls.great_books_3_17["Как хорошо были организованы материалы курса"] = parseInt(req.body["Как хорошо были организованы материалы курса"]);
  session.polls.great_books_3_17["Сколько процентов обязательных текстов по этой части курса вы успевали прочесть"] = parseInt(req.body["Сколько процентов обязательных текстов по этой части курса вы успевали прочесть"]);
  session.polls.great_books_3_17["Какой из прочитанных текстов оказал на вас наибольшее влияние? Почему?"] = req.body["Какой из прочитанных текстов оказал на вас наибольшее влияние? Почему?"];
  session.polls.great_books_3_17["Насколько полно преподаватель следовал программе курса"] = parseInt(req.body["Насколько полно преподаватель следовал программе курса"]);
  session.polls.great_books_3_17["Оцените сложность лекций для вашего понимания"] = parseInt(req.body["Оцените сложность лекций для вашего понимания"]);
  session.polls.great_books_3_17["Насколько новым для вас было содержание лекций"] = parseInt(req.body["Насколько новым для вас было содержание лекций"]);
  session.polls.great_books_3_17["Насколько изменились ваше мышление, знания и умения"] = parseInt(req.body["Насколько изменились ваше мышление, знания и умения"]);
  session.polls.great_books_3_17["Насколько хорошо преподаватель объясняет материал"] = parseInt(req.body["Насколько хорошо преподаватель объясняет материал"]);
  session.polls.great_books_3_17["Насколько хорошо преподаватель организует интерактивную коммуникацию в группе"] = parseInt(req.body["Насколько хорошо преподаватель организует интерактивную коммуникацию в группе"]);
  session.polls.great_books_3_17["Что вам больше всего понравилось в этом лекционном курсе"] = req.body["Что вам больше всего понравилось в этом лекционном курсе"];
  session.polls.great_books_3_17["Что вам больше всего не понравилось в этом лекционном курсе"] = req.body["Что вам больше всего не понравилось в этом лекционном курсе"];
  session.polls.great_books_3_17["Что для вас было самым сложным в этом лекционном курсе"] = req.body["Что для вас было самым сложным в этом лекционном курсе"];
  session.polls.great_books_3_17["Как бы вы порекомендовали улучшить этот лекционный курс"] = req.body["Как бы вы порекомендовали улучшить этот лекционный курс"];

  sess.save(function(err) {
    if (err)
      return console.error(err);
    return;
  });
  let mailOptions = {
    from: '"SAS" <sas@utmn.ru>', // sender address
    to: 'marat.goya@gmail.com, e.samokhvalova@utmn.ru, a.rusakova@utmn.ru', // list of receivers
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
