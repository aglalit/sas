module.exports = function(app, Session, User, transporter, isLoggedIn, logger) {

  app.get('/feedback', function(req, res) {
    var query = {};

    if (req.query.s === 'ba_2019_electives') {
      Session.find({
        $or: [{
            "polls.ba_2019_year1_module4_electives": {
              $exists: true
            }
          },
          {
            "polls.ba_2019_year2_module8_electives": {
              $exists: true
            }
          },
          {
            "polls.ba_2019_year2_module8_electives2": {
              $exists: true
            }
          }
        ]
      }, {
        'polls.ba_2019_year1_module4_electives': 1,
        'polls.ba_2019_year2_module8_electives': 1,
        'polls.ba_2019_year2_module8_electives2': 1
      }).exec(function(err, docs) {
        if (err) {
          res.send(err);
          console.log(err);
        } else {
          docs.map((el) => {
            console.log(el._doc.polls)
          });
          res.render('feedback', {
            data: JSON.stringify(docs)
          });
        }
      });
    } else if (req.query.s === 'all') {
      Session.find({
        $and: [{
            'polls': {
              $exists: true
            }
          },
          {
            'polls.registration': {
              $exists: false
            }
          },
          {
            'polls.faculty_research_trips': {
              $exists: false
            }
          }
        ]
      }).select('polls').select('polls').sort({
        _id: -1
      }).limit(1500).exec(function(err, docs) {
        if (err) {
          res.send(err);
          console.log(err);
        } else {
          res.render('feedback', {
            data: JSON.stringify(docs)
          });
        }
      });
    } else {
      query['polls.' + req.query.s] = {
        $exists: true
      };
      Session.find(query).select('polls.' + req.query.s).exec(function(err, docs) {
        if (err) {
          res.send(err);
          console.log(err);
        } else {
          console.log(docs);
          res.render('feedback', {
            data: JSON.stringify(docs)
          });
        }
      });
    }



  });

  app.get('/feedback2', function(req, res) {
    var query = {};

    if (req.query.s === 'ba_2019_electives') {
      Session.find({
        $or: [{
            "polls.ba_2019_module1_elective1": {
              $exists: true
            }
          },
          {
            "polls.ba_2019_module1_elective2": {
              $exists: true
            }
          },
          {
            "polls.ba_2019_module1_elective3": {
              $exists: true
            }
          },
          {
            "polls.ba_2019_module1_major1": {
              $exists: true
            }
          },
          {
            "polls.ba_2019_module1_major2": {
              $exists: true
            }
          }
        ]
      }, {
        'polls.ba_2019_module1_elective1': 1,
        'polls.ba_2019_module1_elective2': 1,
        'polls.ba_2019_module1_elective3': 1,
        'polls.ba_2019_module1_major1': 1,
        'polls.ba_2019_module1_major2': 1
      }).exec(function(err, docs) {
        if (err) {
          res.send(err);
          console.log(err);
        } else {
          docs.map((el) => {
            console.log(el._doc.polls)
          });
          res.render('feedback2', {
            data: JSON.stringify(docs)
          });
        }
      });
    } else if (req.query.s === 'ba_2019_year2_module5_poms') {
      Session.find({
        $or: [{
            "polls.ba_2019_year2_module5_poms_louis": {
              $exists: true
            }
          },
          {
            "polls.ba_2019_year2_module5_poms_krishna": {
              $exists: true
            }
          },
          {
            "polls.ba_2019_year2_module5_poms_juliette": {
              $exists: true
            }
          }
        ]
      }, {
        'polls.ba_2019_year2_module5_poms_louis': 1,
        'polls.ba_2019_year2_module5_poms_krishna': 1,
        'polls.ba_2019_year2_module5_poms_juliette': 1
      }).exec(function(err, docs) {
        if (err) {
          res.send(err);
          console.log(err);
        } else {
          docs.map((el) => {
            console.log(el._doc.polls)
          });
          res.render('feedback2', {
            data: JSON.stringify(docs)
          });
        }
      });
    } else if (req.query.s === 'all') {
      Session.find({
        $and: [{
            'polls': {
              $exists: true
            }
          },
          {
            'polls.registration': {
              $exists: false
            }
          },
          {
            'polls.faculty_research_trips': {
              $exists: false
            }
          }
        ]
      }).select('polls').select('polls').sort({
        _id: -1
      }).limit(2500).exec(function(err, docs) {
        if (err) {
          res.send(err);
          console.log(err);
        } else {
          res.render('feedback2', {
            data: JSON.stringify(docs)
          });
        }
      });
    } else {
      query['polls.' + req.query.s] = {
        $exists: true
      };
      Session.find(query).select('polls.' + req.query.s).exec(function(err, docs) {
        if (err) {
          res.send(err);
          console.log(err);
        } else {
          console.log(docs);
          res.render('feedback2', {
            data: JSON.stringify(docs)
          });
        }
      });
    }



  });

  app.get('/feedback3', function(req, res) {
    var query = {};

    if (req.query.s === 'ba_2019_q2_electives') {
      Session.find({
        $or: [{
            "polls.ba_2019_q2_elective1": {
              $exists: true
            }
          },
          {
            "polls.ba_2019_q2_elective2": {
              $exists: true
            }
          },
          {
            "polls.ba_2019_q2_elective3": {
              $exists: true
            }
          },
          {
            "polls.ba_2019_q2_major1": {
              $exists: true
            }
          },
          {
            "polls.ba_2019_q2_major2": {
              $exists: true
            }
          }
        ]
      }, {
        'polls.ba_2019_q2_elective1': 1,
        'polls.ba_2019_q2_elective2': 1,
        'polls.ba_2019_q2_elective3': 1,
        'polls.ba_2019_q2_major1': 1,
        'polls.ba_2019_q2_major2': 1
      }).exec(function(err, docs) {
        if (err) {
          res.send(err);
          console.log(err);
        } else {
          docs.map((el) => {
            console.log(el._doc.polls)
          });
          res.render('feedback3', {
            data: JSON.stringify(docs)
          });
        }
      });
    } else if (req.query.s === 'ba_2019_year2_q2_poms') {
      Session.find({
        $or: [{
            "polls.ba_2019_year2_q2_poms_louis": {
              $exists: true
            }
          },
          {
            "polls.ba_2019_year2_q2_poms_krishna": {
              $exists: true
            }
          },
          {
            "polls.ba_2019_year2_q2_poms_juliette": {
              $exists: true
            }
          }
        ]
      }, {
        'polls.ba_2019_year2_q2_poms_louis': 1,
        'polls.ba_2019_year2_q2_poms_krishna': 1,
        'polls.ba_2019_year2_q2_poms_juliette': 1
      }).exec(function(err, docs) {
        if (err) {
          res.send(err);
          console.log(err);
        } else {
          docs.map((el) => {
            console.log(el._doc.polls)
          });
          res.render('feedback3', {
            data: JSON.stringify(docs)
          });
        }
      });
    } else if (req.query.s === 'all') {
      Session.find({
        $and: [{
            'polls': {
              $exists: true
            }
          },
          {
            'polls.registration': {
              $exists: false
            }
          },
          {
            'polls.faculty_research_trips': {
              $exists: false
            }
          }
        ]
      }).select('polls').select('polls').sort({
        _id: -1
      }).limit(750).exec(function(err, docs) {
        if (err) {
          res.send(err);
          console.log(err);
        } else {
          res.render('feedback3', {
            data: JSON.stringify(docs)
          });
        }
      });
    } else {
      query['polls.' + req.query.s] = {
        $exists: true
      };
      Session.find(query).select('polls.' + req.query.s).exec(function(err, docs) {
        if (err) {
          res.send(err);
          console.log(err);
        } else {
          console.log(docs);
          res.render('feedback3', {
            data: JSON.stringify(docs)
          });
        }
      });
    }



  });

  app.get('/feedback4', isLoggedIn, function(req, res) {
      var userEmail = '';
      User.findOne({
        '_id': req.user._id
      }, function(err, user) {
        if (err)
          return done(err);

        if (user) {
          userEmail = user.google.email;
          getResponse();
        } else {
          console.log('There isn\'t such user in the database');
        }
      });

      function getResponse() {
        var dict = {
          Louis: {
            name: 'Louis Vervoort',
            email: 'l.vervoort@utmn.ru'
          },
          Reshe: {
            name: 'Julie Reshe',
            email: 'j.reshe@utmn.ru'
          },
          Svetlana: {
            name: 'Svetlana Erpyleva',
            email: 's.erpyleva@utmn.ru'
          },
          Vitaly: {
            name: 'Vitaly Nikolaev',
            email: 'v.nikolaev@utmn.ru'
          },
          Mike: {
            name: 'Mike Shapira',
            email: 'm.schapira@utmn.ru'
          },
          Daniel: {
            name: 'Daniel Kontowski',
            email: 'd.kontowski@utmn.ru'
          },
          Corinne: {
            name: 'Corinne Doria',
            email: 'c.doria@utmn.ru'
          },
          Curating: {
            name: 'Henry Davidson (Curating Contemporary Art)',
            email: 'henrywdavidson@gmail.com '
          },
          Performance: {
            name: 'Henry Davidson (Identity and Performance)',
            email: 'henrywdavidson@gmail.com '
          },
          Thinking: {
            name: 'Melina Aarnikoivu (Thinking on Paper)',
            email: 'melina.aarnikoivu@gmail.com'
          },
          Speaking: {
            name: 'Melina Aarnikoivu (Public Speaking)',
            email: 'melina.aarnikoivu@gmail.com'
          },
          Dmitry: {
            name: 'Dmitry Kurnosov',
            email: 'dd.kurnosov@gmail.com'
          },
          Alexander: {
            name: 'Alexander Didenko',
            email: 'alexander.didenko@gmail.com'
          },
          Anna: {
            name: 'Anna Varfolomeeva',
            email: 'a.varfolomeeva@utmn.ru'
          },
          Erika: {
            name: 'Erika Wolf',
            email: 'e.wolf@utmn.ru'
          },
          ECON_Probability: {
            name: 'Alexander Didenko (ECON_Probability and Stats 2)',
            email: 'alexander.didenko@gmail.com'
          },
          ECON_Econometrics: {
            name: 'Alexander Didenko (ECON_Econometrics)',
            email: 'alexander.didenko@gmail.com'
          },
          David: {
            name: 'David Melbye',
            email: 'd.melbye@utmn.ru'
          },
          Maxim: {
            name: 'Maxim Alyukov',
            email: 'm.alyukov@utmn.ru'
          },
          Jan: {
            name: 'Jan Krasni',
            email: 'j.krasni@utmn.ru'
          },
          Munesh: {
            name: 'Munesh Chauhan',
            email: 'm.chauhan@utmn.ru'
          },
          Juliette: {
            name: 'Juliette Colinas',
            email: 'j.colinas@utmn.ru'
          },
          Berdiugina: {
            name: 'O. Berdiugina',
            email: 'o.n.berdyugina@utmn.ru'
          },
          Platonov: {
            name: 'M. Platonov',
            email: 'm.l.platonov@utmn.ru'
          },
          Sharmin: {
            name: 'D. Sharmin',
            email: 'd.v.sharmin@utmn.ru'
          },
          Ufukova: {
            name: 'O. Ufukova',
            email: 'o.n.berdyugina@utmn.ru'
          },
          Giacomo: {
            name: 'Giacomo Andreoletti',
            email: 'g.andreoletti@utmn.ru'
          },
          Jay: {
            name: 'Jay Silverstein',
            email: 'j.silverstein@utmn.ru'
          },
          Taisya: {
            name: 'Taisya Pogodaeva',
            email: 't.v.pogodaeva@utmn.ru'
          },
          Andrey: {
            name: 'Andrey Shcherbenok',
            email: 'a.shcherbenok@utmn.ru'
          }
        }
        var query = {};

        if (req.query.t) {

        }

        if (req.query.s === 'ba_2019_q3_electives') {
          if (req.query.t && (userEmail === dict[req.query.t][email] || userEmail === 'm.agliulin@utmn.ru')) {
            Session.find({
              $or: [{
                  "polls.ba_2019_q3_elective1['Who taught this course']": {
                    $regex: `${dict[req.query.t][name]}`
                  }
                },
                {
                  "polls.ba_2019_q3_elective2['Who taught this course']": {
                    $regex: `${dict[req.query.t][name]}`
                  }
                },
                {
                  "polls.ba_2019_q3_major3['Who taught this course']": {
                    $regex: `${dict[req.query.t][name]}`
                  }
                },
                {
                  "polls.ba_2019_q3_major1['Who taught this course']": {
                    $regex: `${dict[req.query.t][name]}`
                  }
                },
                {
                  "polls.ba_2019_q3_major2['Who taught this course']": {
                    $regex: `${dict[req.query.t][name]}`
                  }
                }
              ]
            }, {
              'polls.ba_2019_q3_elective1': 1,
              'polls.ba_2019_q3_elective2': 1,
              'polls.ba_2019_q3_major3': 1,
              'polls.ba_2019_q3_major1': 1,
              'polls.ba_2019_q3_major2': 1
            }).exec(function(err, docs) {
              if (err) {
                res.send(err);
                console.log(err);
              } else {
                docs.map((el) => {
                  console.log(el._doc.polls)
                });
                res.render('feedback4', {
                  data: JSON.stringify(docs)
                });
              }
            });
          } else if {
            if (userEmail === 'm.agliulin@utmn.ru') {
              Session.find({
                $or: [{
                    "polls.ba_2019_q3_elective1": {
                      $exists: true
                    }
                  },
                  {
                    "polls.ba_2019_q3_elective2": {
                      $exists: true
                    }
                  },
                  {
                    "polls.ba_2019_q3_major3": {
                      $exists: true
                    }
                  },
                  {
                    "polls.ba_2019_q3_major1": {
                      $exists: true
                    }
                  },
                  {
                    "polls.ba_2019_q3_major2": {
                      $exists: true
                    }
                  }
                ]
              }, {
                'polls.ba_2019_q3_elective1': 1,
                'polls.ba_2019_q3_elective2': 1,
                'polls.ba_2019_q3_major3': 1,
                'polls.ba_2019_q3_major1': 1,
                'polls.ba_2019_q3_major2': 1
              }).exec(function(err, docs) {
                if (err) {
                  res.send(err);
                  console.log(err);
                } else {
                  docs.map((el) => {
                    console.log(el._doc.polls)
                  });
                  res.render('feedback4', {
                    data: JSON.stringify(docs)
                  });
                }
              });
            }
          } else {
            res.render('Access denied');
          }
        });
    }
  }
}
else if (req.query.s === 'all') {
  if (userEmail === 'm.agliulin@utmn.ru') {
    Session.find({
      $and: [{
          'polls': {
            $exists: true
          }
        },
        {
          'polls.registration': {
            $exists: false
          }
        },
        {
          'polls.faculty_research_trips': {
            $exists: false
          }
        }
      ]
    }).select('polls').select('polls').sort({
      _id: -1
    }).limit(1500).exec(function(err, docs) {
      if (err) {
        res.send(err);
        console.log(err);
      } else {
        res.render('feedback4', {
          data: JSON.stringify(docs)
        });
      }
    });
  } else {
    res.render('feedback4', {});
  }

} else {
  if (req.query.t && (userEmail === dict[req.query.t][email] || userEmail === 'm.agliulin@utmn.ru')) {
    query['polls.' + req.query.s] = {
      $regex: `${dict[req.query.t][name]}`
    };
    Session.find(query).select('polls.' + req.query.s).exec(function(err, docs) {
      if (err) {
        res.send(err);
        console.log(err);
      } else {
        console.log(docs);
        res.render('feedback4', {
          data: JSON.stringify(docs)
        });
      }
    });
  } else if {
    if (userEmail === 'm.agliulin@utmn.ru') {
      query['polls.' + req.query.s] = {
        $exists: true
      };
      Session.find(query).select('polls.' + req.query.s).exec(function(err, docs) {
        if (err) {
          res.send(err);
          console.log(err);
        } else {
          console.log(docs);
          res.render('feedback4', {
            data: JSON.stringify(docs)
          });
        }
      });
    }

  } else {
    res.render('Access denied');
  }
}
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
