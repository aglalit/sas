module.exports = function (app, Session, transporter, officeTransporter, isLoggedIn, User, logger) {
  var name;
  var email;

  app.get('/polls/:path', isLoggedIn, function (req, res) {
    console.log(req.params, req.params.path);
    res.render(req.params.path, {
      user: req.user
    });
  });

  // app.get('/polls/generic',
  // isLoggedIn,
  // function(req, res) {
  //   res.render('generic', {
  //     user: req.user
  //   })
  // });
  //
  // app.get('/polls/generic2',
  // isLoggedIn,
  // function(req, res) {
  //   res.render('generic2', {
  //     user: req.user
  //   })
  // });

  app.post('/polls/generic', function (req, res) {
    if (req.user) {
      User.findOne({
        _id: req.user._id
      }, function (err, user) {
        if (err) {
          req.flash('error', 'There is an error, please try again');
          return done(err);
        }

        if (user) {
          user.polls.generic = JSON.stringify(req.body);

          user.save(function (err, user) {
            if (err) { return console.error(err); }
          }
          );
        } else {
          console.log('There isn\'t such user in the database');
        }
      });
      req.flash('info', 'Your choice is submitted. In case of mistake, you can make your choice again. Thanks for participation.');
      //
      let emailBody = '';
      var bodyKeys = Object.keys(req.body);
      for (let i = 0; i < bodyKeys.length; i++) {
        emailBody += '<p><b>' + bodyKeys[i] + '</b>: ' + req.body[bodyKeys[i]] + '</p>';
      }
      const mailOptions = {
        from: '"SAS" <sas@utmn.ru>', // sender address
        to: 'm.agliulin@utmn.ru', // list of receivers
        subject: 'The choice of electives', // Subject line
        // text:  // plain text body
        html: '<p>' + JSON.stringify(req.user.google.name) + ', ' + JSON.stringify(req.user.google.email) + '</p>' + emailBody.toString() // html body
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
      console.log('req.user doesnt exist');
      req.flash('error', 'An error occurred, please try again');
      res.render('login', {
        messages: req.flash('error')
      });
    }
  });

  app.post('/polls/generic2', function (req, res) {
    if (req.user) {
      User.findOne({
        _id: req.user._id
      }, function (err, user) {
        if (err) {
          req.flash('error', 'There is an error, please try again');
          return done(err);
        }

        if (user) {
          user.polls.generic2 = JSON.stringify(req.body);

          user.save(function (err, user) {
            if (err) { return console.error(err); }
          }
          );
        } else {
          console.log('There isn\'t such user in the database');
        }
      });
      req.flash('info', 'Your choice is submitted. In case of mistake, you can make your choice again. Thanks for participation.');
      //
      let emailBody = '';
      var bodyKeys = Object.keys(req.body);
      for (let i = 0; i < bodyKeys.length; i++) {
        emailBody += '<p><b>' + bodyKeys[i] + '</b>: ' + req.body[bodyKeys[i]] + '</p>';
      }
      const mailOptions = {
        from: '"SAS" <sas@utmn.ru>', // sender address
        to: 'm.agliulin@utmn.ru', // list of receivers
        subject: 'The choice of electives', // Subject line
        // text:  // plain text body
        html: '<p>' + JSON.stringify(req.user.google.name) + ', ' + JSON.stringify(req.user.google.email) + '</p>' + emailBody.toString() // html body
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
      console.log('req.user doesnt exist');
      req.flash('error', 'An error occurred, please try again');
      res.render('login', {
        messages: req.flash('error')
      });
    }
  });

  app.post('/polls/generic3', function (req, res) {
    if (req.user) {
      User.findOne({
        _id: req.user._id
      }, function (err, user) {
        if (err) {
          req.flash('error', 'There is an error, please try again');
          return done(err);
        }

        if (user) {
          user.polls.generic3 = JSON.stringify(req.body);

          user.save(function (err, user) {
            if (err) { return console.error(err); }
          }
          );
        } else {
          console.log('There isn\'t such user in the database');
        }
      });
      req.flash('info', 'Your choice is submitted. In case of mistake, you can make your choice again. Thanks for participation.');
      //
      let emailBody = '';
      var bodyKeys = Object.keys(req.body);
      for (let i = 0; i < bodyKeys.length; i++) {
        emailBody += '<p><b>' + bodyKeys[i] + '</b>: ' + req.body[bodyKeys[i]] + '</p>';
      }
      const mailOptions = {
        from: '"SAS" <sas@utmn.ru>', // sender address
        to: 'm.agliulin@utmn.ru', // list of receivers
        subject: 'The choice of electives', // Subject line
        // text:  // plain text body
        html: '<p>' + JSON.stringify(req.user.google.name) + ', ' + JSON.stringify(req.user.google.email) + '</p>' + emailBody.toString() // html body
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
      console.log('req.user doesnt exist');
      req.flash('error', 'An error occurred, please try again');
      res.render('login', {
        messages: req.flash('error')
      });
    }
  });

  app.post('/polls/generic4', function (req, res) {
    if (req.user) {
      User.findOne({
        _id: req.user._id
      }, function (err, user) {
        if (err) {
          req.flash('error', 'There is an error, please try again');
          return done(err);
        }

        if (user) {
          user.polls.generic4 = JSON.stringify(req.body);

          user.save(function (err, user) {
            if (err) { return console.error(err); }
          }
          );
        } else {
          console.log('There isn\'t such user in the database');
        }
      });
      req.flash('info', 'Your choice is submitted. In case of mistake, you can make your choice again. Thanks for participation.');
      //
      let emailBody = '';
      var bodyKeys = Object.keys(req.body);
      for (let i = 0; i < bodyKeys.length; i++) {
        emailBody += '<p><b>' + bodyKeys[i] + '</b>: ' + req.body[bodyKeys[i]] + '</p>';
      }
      const mailOptions = {
        from: '"SAS" <sas@utmn.ru>', // sender address
        to: 'm.agliulin@utmn.ru', // list of receivers
        subject: 'The choice of electives', // Subject line
        // text:  // plain text body
        html: '<p>' + JSON.stringify(req.user.google.name) + ', ' + JSON.stringify(req.user.google.email) + '</p>' + emailBody.toString() // html body
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
      console.log('req.user doesnt exist');
      req.flash('error', 'An error occurred, please try again');
      res.render('login', {
        messages: req.flash('error')
      });
    }
  });

  app.post('/polls/feedback-collector', function (req, res) {
    if (req.user) {
      User.findOne({
        _id: req.user._id
      }, function (err, user) {
        if (err) { logger.error(err); }
        console.log(err);

        if (user) {
          name = user.google.name;
          email = user.google.email;
          user.polls.FEEDBACK[req.body.subject] = true;

          user.save(function (err, user) {
            if (err) { return console.error(err); }
          }
          );
        } else {
          console.log('There isn\'t such user in the database');
        }

        Session.findOne({
          session_id: req.session.id
        }, function (err, session) {
          if (err) { logger.error(err); }
          console.log(err);

          if (session) {
            parseSession(session, req, transporter);
          } else {
            var newSession = new Session();
            parseSession(newSession, req, transporter);
          }
        });
      });
    } else {
      Session.findOne({
        session_id: req.session.id
      }, function (err, session) {
        if (err) { logger.error(err); }
        console.log(err);

        if (session) {
          parseSession(session, req, transporter);
        } else {
          var newSession = new Session();
          parseSession(newSession, req, transporter);
        }
      });
    }

    req.flash('info', 'The form is submitted. Thanks for the feedback ( ͡° ͜ʖ ͡°)');
    res.render('polls', {
      user: req.user,
      messages: req.flash('info')
    });

    function parseSession (sess, req, transporter) {
      var now = new Date();
      sess.session_id = req.session.id;

      if (email && dictOnline.includes(email)) {
        req.body["online"] = true;
      }
      //   var keyNames = Object.keys(req.body);
      //   keyNames.forEach((el)=>{
      //     console.log(req.body[el]);
      //
      //       sess.polls.ba_2018_year2_the_city_as_text[el] = req.body[el];
      // });
      let emailBody = '';
      var bodyKeys = Object.keys(req.body);
      for (let i = 0; i < bodyKeys.length; i++) {
        emailBody += '<p><b>' + bodyKeys[i] + '</b>: ' + req.body[bodyKeys[i]] + '</p>';
      }
      sess.polls[req.body.subject.replace(/-/g, '_')] = JSON.stringify(req.body);
      sess.save(function (err) {
        if (err) { logger.error(err); }
        return console.error(err);
        return;
      });
      let mailOptions = {
        from: '"SAS" <sas@utmn.ru>', // sender address
        to: 'm.agliulin@utmn.ru', // list of receivers
        subject: `${name}: ${email}`, // Subject line
        // text: JSON.stringify(req.user), // plain text body
        html: emailBody.toString() // html body
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          logger.error(error);
          logger.error(mailOptions.subject);
          logger.error(mailOptions.html);
          return console.log(error);
        }
        if (info) {
          logger.info(mailOptions.html);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
      });
    }
  });
};
const dictOnline = [
  'a.ashba.sas@gmail.com',
  'a.bologov.sas@gmail.com',
  'a.plokhikh.sas@gmail.com',
  'a.siniutkin.sas@gmail.com',
  'd.berdnikov.sas@gmail.com',
  'e.sigareva.sas@gmail.com',
  'i.safronov.sas@gmail.com',
  'r.raemgulova.sas@gmail.com',
  's.brudkova.sas@gmail.com',
  'a.bugorkov.media@gmail.com',
  'a.klimishin.media@gmail.com',
  'd.sharashkina.media@gmail.com',
  'l.tikhonchuk.media@gmail.com',
  'l.arutiunian.media@gmail.com',
  'd.kochetov.media@gmail.com',
  'a.banyukevich.sas@gmail.com',
  'a.bekchentaeva.sas@gmail.com',
  'a.bekmanova.sas@gmail.com',
  'a.bogdanova.sas@gmail.com',
  'a.boiarinova.sas@gmail.com',
  'a.budahina.sas@gmail.com',
  'a.chernyak.sas@gmail.com',
  'a.demov.sas@gmail.com',
  'a.dolgushin.sas@gmail.com',
  'a.dudnichenko.sas@gmail.com',
  'a.eifert.sas@gmail.com',
  'a.goncharenko.sas@gmail.com',
  'a.grachyova.sas@gmail.com',
  'a.kleshchenok.sas@gmail.com',
  'a.kozadaeva.sas@gmail.com',
  'a.kravchenko.sas@gmail.com',
  'a.kuznetsova.sas@gmail.com',
  'a.kyosya.sas@gmail.com',
  'a.malchikhina.sas@gmail.com',
  'a.mysova.sas@gmail.com',
  'a.nagornova.sas@gmail.com',
  'a.ohmush.sas@gmail.com',
  'a.ponich.sas@gmail.com',
  'a.rakhmatullina.sas@gmail.com',
  'a.rozmanov.sas@gmail.com',
  'a.sidenko.sas@gmail.com',
  'a.strekalina.sas@gmail.com',
  'a.uskova.sas@gmail.com',
  'a.zalyaletdinova.sas@gmail.com',
  'a.zavarzina.sas@gmail.com',
  'a.zhuravleva.sas@gmail.com',
  'alexandr.li.sas@gmail.com',
  'b.babkin.sas@gmail.com',
  'ch.evseyeva.sas@gmail.com',
  'd.balandin.sas@gmail.com',
  'd.grin.sas@gmail.com',
  'd.kakenova.sas@gmail.com',
  'd.kolisnichenko.sas@gmail.com',
  'd.lumpova.sas@gmail.com',
  'd.makarova.sas@gmail.com',
  'd.novikova.sas@gmail.com',
  'd.parusimova.sas@gmail.com',
  'd.savchenko.sas@gmail.com',
  'd.tukhvatullin.sas@gmail.com',
  'd.yagafarova.sas@gmail.com',
  'e.alexandrova.sas@gmail.com',
  'e.azanova.sas@gmail.com',
  'e.belousova.sas@gmail.com',
  'e.chekhonatskiy.sas@gmail.com',
  'e.drozdova.sas@gmail.com',
  'e.fedorova.sas@gmail.com',
  'e.filatova.sas@gmail.com',
  'e.kaverina.sas@gmail.com',
  'e.kolesnikova.sas@gmail.com',
  'e.kolosova.sas@gmail.com',
  'e.masleeva.sas@gmail.com',
  'e.morokov.sas@gmail.com',
  'e.moskvicheva.sas@gmail.com',
  'e.permyakov.sas@gmail.com',
  'e.sutulova.sas@gmail.com',
  'e.sychyova.sas@gmail.com',
  'e.taratunina.sas@gmail.com',
  'e.ukhanyova.sas@gmail.com',
  'e.zhila.sas@gmail.com',
  'e.zhuravets.sas@gmail.com',
  'g.chunarev.sas@gmail.com',
  'g.kaplunkov.sas@gmail.com',
  'i.bogatyrev.sas@gmail.com',
  'i.karasev.sas@gmail.com',
  'i.leonyuk.sas@gmail.com',
  'i.malyshev.sas@gmail.com',
  'i.sclyuev.sas@gmail.com',
  'i.vostriakova.sas@gmail.com',
  'i.yakovlev.sas@gmail.com',
  'j.arkhipova.sas@gmail.com',
  'j.simbirtseva.sas@gmail.com',
  'k.dergacheva.sas@gmail.com',
  'k.ekimova.sas@gmail.com',
  'k.kurepova.sas@gmail.com',
  'k.meydi.sas@gmail.com',
  'k.ponomaryov.sas@gmail.com',
  'k.razumova.sas@gmail.com',
  'k.simonova.sas@gmail.com',
  'k.terleev.sas@gmail.com',
  'kh.farukov.sas@gmail.com',
  'l.gorbushina.sas@gmail.com',
  'm.abdulahadova.sas@gmail.com',
  'm.aljadeed.sas@gmail.com',
  'm.gurich.sas@gmail.com',
  'm.iampolskaia.sas@gmail.com',
  'm.pestunova.sas@gmail.com',
  'm.posokhova.sas@gmail.com',
  'm.rodina.sas@gmail.com',
  'm.vasenina.sas@gmail.com',
  'n.dier.sas@gmail.com',
  'n.kudin.sas@gmail.com',
  'n.salmin.sas@gmail.com',
  'p.avgustenyak.sas@gmail.com',
  'p.chernigova.sas@gmail.com',
  'p.garyaeva.sas@gmail.com',
  'p.ningrum.sas@gmail.com',
  'p.shishkina.sas@gmail.com',
  'p.shlegel.sas@gmail.com',
  'r.murzagulova.sas@gmail.com',
  's.abdireukov.sas@gmail.com',
  's.fedorova.sas@gmail.com',
  's.gorshkova.sas@gmail.com',
  's.kazarnovich.sas@gmail.com',
  's.kolusheva.sas@gmail.com',
  's.malygin.sas@gmail.com',
  's.patrakeeva.sas@gmail.com',
  't.ivanchencko.sas@gmail.com',
  'u.habibulina.sas@gmail.com',
  'v.aleksandrova.sas@gmail.com',
  'v.bahareva.sas@gmail.com',
  'v.kibukevich.sas@gmail.com',
  'v.matsakova.sas@gmail.com',
  'v.matushkin.sas@gmail.com',
  'v.mizyakov.sas@gmail.com',
  'v.orlova.sas@gmail.com',
  'v.panikarovskikh.sas@gmail.com',
  'v.petukhov.sas@gmail.com',
  'v.pulnikova.sas@gmail.com',
  'v.scherbakova.sas@gmail.com',
  'v.shcherbakov.sas@gmail.com',
  'v.stryukov.sas@gmail.com',
  'v.tikhonenko.sas@gmail.com',
  'v.vtorushina.sas@gmail.com',
  'v.zemlyanukhina.sas@gmail.com',
  'y.trofimova.sas@gmail.com',
  'y.yanisheva.sas@gmail.com',
  'andrey.volkov.media@gmail.com',
  'a.azarova.media@gmail.com',
  'o.dmitrieva.media@gmail.com',
  'i.guliev.media@gmail.com',
  'a.kirilova.media@gmail.com',
  'r.rafikov.media@gmail.com',
  'm.yurkina.media@gmail.com',
  'i.kashapov.sas@gmail.com',
  'm.zhirenkova.media@gmail.com',
  'm.agliulin@utmn.ru'
];
