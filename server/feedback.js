module.exports = function (app, Session, User, transporter, isLoggedIn, logger) {
  var dict = {
    Louis: {
      name: 'Louis Vervoort',
      email: 'l.vervoort@utmn.ru'
    },
    Zachary: {
      name: 'Zachary Reyna',
      email: 'z.reyna@utmn.ru'
    },
    Reshe: {
      name: 'Julie Reshe',
      email: 'j.reshe@utmn.ru'
    },
    Denis: {
      name: 'Denis Sharapov',
      email: 'd.sharapov@utmn.ru'
    },
    Peter: {
      name: 'Peter Jones',
      email: 'p.jones@utmn.ru'
    },
    Matvey: {
      name: 'Matvey Lomonosov',
      email: 'm.lomonosov@utmn.ru'
    },
    Structure: {
      name: 'Elena Grigorieva',
      email: 'egrig58@gmail.com'
    },
    Golden: {
      name: 'Elena Grigorieva',
      email: 'egrig58@gmail.com'
    },
    Svirina: {
      name: 'Ekaterina Svirina',
      email: 'ekaterina.svirina@gmail.com'
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
      name: 'Curating Contemporary Art',
      email: 'henrywdavidson@gmail.com'
    },
    Performance: {
      name: 'Identity and Performance',
      email: 'henrywdavidson@gmail.com'
    },
    Thinking: {
      name: 'Thinking on Paper',
      email: 'melina.aarnikoivu@gmail.com'
    },
    Speaking: {
      name: 'Public Speaking',
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
    Anne: {
      name: 'Anne Mulhall',
      email: 'a.mulhall@utmn.ru'
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
      email: 'd.melbyue@utmn.ru'
    },
    Maxim: {
      name: 'Maxim Alyukov',
      email: 'm.alyukov@utmn.ru'
    },
    Jan: {
      name: 'Jan Krasni',
      email: 'y.krasni@utmn.ru'
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
      email: 'a.bunkova@utmn.ru'
    },
    Saltanova: {
      name: 'Tatiana Saltanova',
      email: 't.v.saltanova@utmn.ru'
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
    },
    Fabio: {
      name: 'Fabio Grazioso',
      email: 'f.grazioso@utmn.ru'
    },
    Ivanova: {
      name: 'Velemira Ivanova',
      email: 'v.ivanova@utmn.ru'
    },
    Sharmin: {
      name: 'Dmitry Sharmin',
      email: 'd.v.sharmin@utmn.ru'
    },
    Arslan: {
      name: 'Ayla Arslan',
      email: 'a.arslan@utmn.ru'
    },
    Aarnikoivu: {
      name: 'Melina Aarnikoivu',
      email: 'melina.aarnikoivu@gmail.com'
    },
    Kotkina: {
      name: 'Irina Kotkina',
      email: 'ik341@ya.ru'
    },
    Usvitskiy: {
      name: 'Alexander Usvitskiy',
      email: 'a.usvitskiy@utmn.ru'
    },
    Lesnik: {
      name: 'Peter Lesnik',
      email: 'p.leshnik@utmn.ru'
    },
    Prischepa: {
      name: 'Vladimir Prischepa',
      email: 'prischepa.vladimirr@gmail.com'
    },
    Zmeev: {
      name: 'Denis Zmeev',
      email: 'zmdeol@gmail.com'
    },
    Bagiev: {
      name: 'Artem Bagiev',
      email: 'artem.bagiev@gmail.com '
    },
    Kolozaridi: {
      name: 'Polina Kolozaridi',
      email: 'poli.kolozaridi@gmail.com'
    },
    Andreevskikh: {
      name: 'Olga Andreevskikh',
      email: 'mlosa@leeds.ac.uk'
    },
    Melnyk: {
      name: 'Dara Melnyk',
      email: 'd.melnyk@utmn.ru'
    },
    Turk: {
      name: 'Marko Turk',
      email: 'turk.marko1983@gmail.com'
    },
    Syrchina: {
      name: 'Anna Syrchina',
      email: 'a.s.syrchina@utmn.ru'
    },
    Smagina: {
      name: 'Yana Smagina',
      email: 'y.v.smagina@utmn.ru'
    },
    Azeri: {
      name: 'Siyaves Azeri',
      email: 's.azeri@utmn.ru'
    },
    Krishna: {
      name: 'Krishna K',
      email: 'k.mutkhukumarappan@utmn.ru'
    }
  };

  app.get('/feedback', function (req, res) {
    var query = {};

    if (req.query.s === 'ba_2019_electives') {
      Session.find({
        $or: [{
          'polls.ba_2019_year1_module4_electives': {
            $exists: true
          }
        },
        {
          'polls.ba_2019_year2_module8_electives': {
            $exists: true
          }
        },
        {
          'polls.ba_2019_year2_module8_electives2': {
            $exists: true
          }
        }
        ]
      }, {
        'polls.ba_2019_year1_module4_electives': 1,
        'polls.ba_2019_year2_module8_electives': 1,
        'polls.ba_2019_year2_module8_electives2': 1
      }).exec(function (err, docs) {
        if (err) {
          res.send(err);
          console.log(err);
        } else {
          docs.map((el) => {
            console.log(el._doc.polls);
          });
          res.render('feedback', {
            data: JSON.stringify(docs)
          });
        }
      });
    } else if (req.query.s === 'all') {
      Session.find({
        $and: [{
          polls: {
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
      }).limit(10000).exec(function (err, docs) {
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
      Session.find(query).select('polls.' + req.query.s).exec(function (err, docs) {
        if (err) {
          res.send(err);
          console.log(err);
        } else {

          res.render('feedback', {
            data: JSON.stringify(docs)
          });
        }
      });
    }
  });

  app.get('/feedback2', isLoggedIn, function (req, res) {
    var userEmail = '';
    User.findOne({
      _id: req.user._id
    }, function (err, user) {
      if (err) { return done(err); }

      if (user) {
        userEmail = user.google.email;
        getResponse();
      } else {
        console.log('There isn\'t such user in the database');
      }
    });

    function getResponse () {
      var query = {};
      var isAdmin = false;
      if (userEmail === 'm.agliulin@utmn.ru' || userEmail === 'sasteachingcouncil@gmail.com' ||
        userEmail === 'a.shcherbenok@utmn.ru' || userEmail === 'sas_education@utmn.ru' || userEmail === 'a.rusakova@utmn.ru' ||
      userEmail === 'e.selikhovkina@utmn.ru' || userEmail === 'i.telipko@utmn.ru') {
        isAdmin = true;
      }

      if (req.query.s === 'ba_2019_electives' && isAdmin) {
        Session.find({
          $or: [{
            'polls.ba_2019_module1_elective1': {
              $exists: true
            }
          },
          {
            'polls.ba_2019_module1_elective2': {
              $exists: true
            }
          },
          {
            'polls.ba_2019_module1_elective3': {
              $exists: true
            }
          },
          {
            'polls.ba_2019_module1_major1': {
              $exists: true
            }
          },
          {
            'polls.ba_2019_module1_major2': {
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
        }).exec(function (err, docs) {
          if (err) {
            res.send(err);
            console.log(err);
          } else {
            docs.map((el) => {
              console.log(el._doc.polls);
            });
            res.render('feedback2', {
              data: JSON.stringify(docs),
              user: req.user
            });
          }
        });
      } else if (req.query.s === 'ba_2019_year2_module5_poms' && isAdmin) {
        Session.find({
          $or: [{
            'polls.ba_2019_year2_module5_poms_louis': {
              $exists: true
            }
          },
          {
            'polls.ba_2019_year2_module5_poms_krishna': {
              $exists: true
            }
          },
          {
            'polls.ba_2019_year2_module5_poms_juliette': {
              $exists: true
            }
          }
          ]
        }, {
          'polls.ba_2019_year2_module5_poms_louis': 1,
          'polls.ba_2019_year2_module5_poms_krishna': 1,
          'polls.ba_2019_year2_module5_poms_juliette': 1
        }).exec(function (err, docs) {
          if (err) {
            res.send(err);
            console.log(err);
          } else {
            docs.map((el) => {
              console.log(el._doc.polls);
            });
            res.render('feedback2', {
              data: JSON.stringify(docs),
              user: req.user
            });
          }
        });
      } else if (req.query.s === 'all' && isAdmin) {
        Session.find({
          $and: [{
            polls: {
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
        }).limit(10000).exec(function (err, docs) {
          if (err) {
            res.send(err);
            console.log(err);
          } else {
            res.render('feedback2', {
              data: JSON.stringify(docs),
              user: req.user
            });
          }
        });
      } else {
        query['polls.' + req.query.s] = {
          $exists: true
        };
        Session.find(query).select('polls.' + req.query.s).exec(function (err, docs) {
          if (err) {
            res.send(err);
            console.log(err);
          } else {

            res.render('feedback2', {
              data: JSON.stringify(docs),
              user: req.user
            });
          }
        });
      }
    }
  });

  app.get('/feedback3', isLoggedIn, function (req, res) {
    var userEmail = '';
    User.findOne({
      _id: req.user._id
    }, function (err, user) {
      if (err) { return done(err); }

      if (user) {
        userEmail = user.google.email;
        getResponse();
      } else {
        console.log('There isn\'t such user in the database');
      }
    });

    function getResponse () {
      var query = {};
      var isAdmin = false;
      if (userEmail === 'm.agliulin@utmn.ru' || userEmail === 'sasteachingcouncil@gmail.com' ||
        userEmail === 'a.shcherbenok@utmn.ru' || userEmail === 'sas_education@utmn.ru' || userEmail === 'a.rusakova@utmn.ru' ||
      userEmail === 'e.selikhovkina@utmn.ru' || userEmail === 'i.telipko@utmn.ru') {
        isAdmin = true;
      }

      if (req.query.s === 'ba_2019_q2_electives' && isAdmin) {
        Session.find({
          $or: [{
            'polls.ba_2019_q2_elective1': {
              $exists: true
            }
          },
          {
            'polls.ba_2019_q2_elective2': {
              $exists: true
            }
          },
          {
            'polls.ba_2019_q2_elective3': {
              $exists: true
            }
          },
          {
            'polls.ba_2019_q2_major1': {
              $exists: true
            }
          },
          {
            'polls.ba_2019_q2_major2': {
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
        }).exec(function (err, docs) {
          if (err) {
            res.send(err);
            console.log(err);
          } else {
            docs.map((el) => {
              console.log(el._doc.polls);
            });
            res.render('feedback3', {
              data: JSON.stringify(docs),
              user: req.user
            });
          }
        });
      } else if (req.query.s === 'ba_2019_year2_q2_poms' && isAdmin) {
        Session.find({
          $or: [{
            'polls.ba_2019_year2_q2_poms_louis': {
              $exists: true
            }
          },
          {
            'polls.ba_2019_year2_q2_poms_krishna': {
              $exists: true
            }
          },
          {
            'polls.ba_2019_year2_q2_poms_juliette': {
              $exists: true
            }
          }
          ]
        }, {
          'polls.ba_2019_year2_q2_poms_louis': 1,
          'polls.ba_2019_year2_q2_poms_krishna': 1,
          'polls.ba_2019_year2_q2_poms_juliette': 1
        }).exec(function (err, docs) {
          if (err) {
            res.send(err);
            console.log(err);
          } else {
            docs.map((el) => {
              console.log(el._doc.polls);
            });
            res.render('feedback3', {
              data: JSON.stringify(docs),
              user: req.user
            });
          }
        });
      } else if (req.query.s === 'all' && isAdmin) {
        Session.find({
          $and: [{
            polls: {
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
        }).limit(10000).exec(function (err, docs) {
          if (err) {
            res.send(err);
            console.log(err);
          } else {
            res.render('feedback3', {
              data: JSON.stringify(docs),
              user: req.user
            });
          }
        });
      } else {
        query['polls.' + req.query.s] = {
          $exists: true
        };
        Session.find(query).select('polls.' + req.query.s).exec(function (err, docs) {
          if (err) {
            res.send(err);
            console.log(err);
          } else {

            res.render('feedback3', {
              data: JSON.stringify(docs),
              user: req.user
            });
          }
        });
      }
    }
  });

  app.get('/feedback4', isLoggedIn, function (req, res) {
    var userEmail = '';
    User.findOne({
      _id: req.user._id
    }, function (err, user) {
      if (err) { return done(err); }

      if (user) {
        userEmail = user.google.email;
        getResponse();
      } else {
        console.log('There isn\'t such user in the database');
      }
    });

    function getResponse () {
      var query = {};
      var isAdmin = false;
      if (userEmail === 'm.agliulin@utmn.ru' || userEmail === 'sasteachingcouncil@gmail.com' ||
        userEmail === 'a.shcherbenok@utmn.ru' || userEmail === 'sas_education@utmn.ru' || userEmail === 'a.rusakova@utmn.ru' ||
      userEmail === 'e.selikhovkina@utmn.ru' || userEmail === 'i.telipko@utmn.ru') {
        isAdmin = true;
      }

      if (req.query.s === 'ba_2019_q3_electives') {
        if (req.query.t && (userEmail === dict[req.query.t].email || isAdmin)) {
          Session.find({
            $or: [{
              'polls.ba_2019_q3_elective1': {
                $regex: `${dict[req.query.t].name}`
              }
            },
            {
              'polls.ba_2019_q3_elective2': {
                $regex: `${dict[req.query.t].name}`
              }
            },
            {
              'polls.ba_2019_q3_major3': {
                $regex: `${dict[req.query.t].name}`
              }
            },
            {
              'polls.ba_2019_q3_major1': {
                $regex: `${dict[req.query.t].name}`
              }
            },
            {
              'polls.ba_2019_q3_major2': {
                $regex: `${dict[req.query.t].name}`
              }
            }
            ]
          }, {
            'polls.ba_2019_q3_elective1': 1,
            'polls.ba_2019_q3_elective2': 1,
            'polls.ba_2019_q3_major3': 1,
            'polls.ba_2019_q3_major1': 1,
            'polls.ba_2019_q3_major2': 1
          }).exec(function (err, docs) {
            if (err) {
              res.send(err);
              console.log(err);
            } else {

              docs.map((el) => {
                console.log(el._doc.polls);
              });
              res.render('feedback4', {
                data: JSON.stringify(docs),
                user: req.user
              });
            }
          });
        } else if (isAdmin) {
          Session.find({
            $or: [{
              'polls.ba_2019_q3_elective1': {
                $exists: true
              }
            },
            {
              'polls.ba_2019_q3_elective2': {
                $exists: true
              }
            },
            {
              'polls.ba_2019_q3_major3': {
                $exists: true
              }
            },
            {
              'polls.ba_2019_q3_major1': {
                $exists: true
              }
            },
            {
              'polls.ba_2019_q3_major2': {
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
          }).exec(function (err, docs) {
            if (err) {
              res.send(err);
              console.log(err);
            } else {
              docs.map((el) => {
                console.log(el._doc.polls);
              });
              res.render('feedback4', {
                data: JSON.stringify(docs),
                user: req.user
              });
            }
          });
        } else {
          res.send('Access denied');
        }
      } else if (req.query.s === 'all') {
        if (isAdmin) {
          Session.find({
            $and: [{
              polls: {
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
          }).select('polls').sort({
            _id: -1
          }).limit(10000).exec(function (err, docs) {
            if (err) {
              res.send(err);
              console.log(err);
            } else {
              res.render('feedback4', {
                data: JSON.stringify(docs),
                user: req.user
              });
            }
          });
        } else {
          res.render('feedback4', {
            user: req.user
          });
        }
      } else {
        if (req.query.t && (userEmail === dict[req.query.t].email || isAdmin)) {
          query['polls.' + req.query.s] = {
            $regex: `${dict[req.query.t].name}`
          };
          Session.find(query).select('polls.' + req.query.s).exec(function (err, docs) {
            if (err) {
              res.send(err);
              console.log(err);
            } else {
              res.render('feedback4', {
                data: JSON.stringify(docs),
                user: req.user
              });
            }
          });
        } else if (isAdmin ||
          (req.query.s === 'ba_2019_year1_q3_gi' && (userEmail === 'j.silverstein@utmn.ru' || userEmail === 'd.dusseault@utmn.ru')) ||
          (req.query.s === 'ba_2019_year2_q3_dt' && (userEmail === 'e.selikhovkina@utmn.ru' || userEmail === 'd.dusseault@utmn.ru')) ||
          (req.query.s === 'ba_2019_year2_q3_gb') ||
          (req.query.s === 'ba_2019_year1_q3_history' && (userEmail === 'c.doria@utmn.ru' || userEmail === 'marat.goya@gmail.com'))

        ) {
          query['polls.' + req.query.s] = {
            $exists: true
          };
          Session.find(query).select('polls.' + req.query.s).exec(function (err, docs) {
            if (err) {
              res.send(err);
              console.log(err);
            } else {

              res.render('feedback4', {
                data: JSON.stringify(docs),
                user: req.user
              });
            }
          });
        } else {
          res.send('Access denied');
        }
      }
    }
  });

  app.get('/feedback5', isLoggedIn, function (req, res) {
    var userEmail = '';
    User.findOne({
      _id: req.user._id
    }, function (err, user) {
      if (err) { return done(err); }

      if (user) {
        userEmail = user.google.email;
        getResponse();
      } else {
        console.log('There isn\'t such user in the database');
      }
    });

    function getResponse () {
      var query = {};
      var isAdmin = false;
      if (userEmail === 'm.agliulin@utmn.ru' || userEmail === 'sasteachingcouncil@gmail.com' ||
        userEmail === 'a.shcherbenok@utmn.ru' || userEmail === 'sas_education@utmn.ru' || userEmail === 'a.rusakova@utmn.ru' ||
      userEmail === 'e.selikhovkina@utmn.ru' || userEmail === 'i.telipko@utmn.ru') {
        isAdmin = true;
      }

      if (req.query.s === 'ba_2019_q4_electives') {
        if (req.query.t && (userEmail === dict[req.query.t].email || isAdmin)) {
          Session.find({
            $or: [{
              'polls.ba_2019_q4_elective1': {
                $regex: `${dict[req.query.t].name}`
              }
            },
            {
              'polls.ba_2019_q4_elective2': {
                $regex: `${dict[req.query.t].name}`
              }
            },
            {
              'polls.ba_2019_q4_elective3': {
                $regex: `${dict[req.query.t].name}`
              }
            },
            {
              'polls.ba_2019_q4_major3': {
                $regex: `${dict[req.query.t].name}`
              }
            },
            {
              'polls.ba_2019_q4_major1': {
                $regex: `${dict[req.query.t].name}`
              }
            },
            {
              'polls.ba_2019_q4_major2': {
                $regex: `${dict[req.query.t].name}`
              }
            }
            ]
          }, {
            'polls.ba_2019_q4_elective1': 1,
            'polls.ba_2019_q4_elective2': 1,
            'polls.ba_2019_q4_elective3': 1,
            'polls.ba_2019_q4_major3': 1,
            'polls.ba_2019_q4_major1': 1,
            'polls.ba_2019_q4_major2': 1
          }).exec(function (err, docs) {
            if (err) {
              res.send(err);
              console.log(err);
            } else {

              docs.map((el) => {
                console.log(el._doc.polls);
              });
              res.render('feedback5', {
                data: JSON.stringify(docs),
                user: req.user
              });
            }
          });
        } else if (isAdmin) {
          Session.find({
            $or: [{
              'polls.ba_2019_q4_elective1': {
                $exists: true
              }
            },
            {
              'polls.ba_2019_q4_elective2': {
                $exists: true
              }
            },
            {
              'polls.ba_2019_q4_elective3': {
                $exists: true
              }
            },
            {
              'polls.ba_2019_q4_major3': {
                $exists: true
              }
            },
            {
              'polls.ba_2019_q4_major1': {
                $exists: true
              }
            },
            {
              'polls.ba_2019_q4_major2': {
                $exists: true
              }
            }
            ]
          }, {
            'polls.ba_2019_q4_elective1': 1,
            'polls.ba_2019_q4_elective2': 1,
            'polls.ba_2019_q4_elective3': 1,
            'polls.ba_2019_q4_major3': 1,
            'polls.ba_2019_q4_major1': 1,
            'polls.ba_2019_q4_major2': 1
          }).exec(function (err, docs) {
            if (err) {
              res.send(err);
              console.log(err);
            } else {
              // docs.map((el) => {
              //   console.log(el._doc.polls);
              // });
              res.render('feedback5', {
                data: JSON.stringify(docs),
                user: req.user
              });
            }
          });
        } else {
          res.send('Access denied');
        }
      } else if (req.query.s === 'all') {
        if (isAdmin) {
          Session.find({
            $and: [{
              polls: {
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
          }).select('polls').sort({
            _id: -1
          }).limit(10000).exec(function (err, docs) {
            if (err) {
              res.send(err);
              console.log(err);
            } else {
              res.render('feedback5', {
                data: JSON.stringify(docs),
                user: req.user
              });
            }
          });
        } else {
          res.render('feedback5', {
            user: req.user
          });
        }
      } else {
        if (req.query.t && (userEmail === dict[req.query.t].email || isAdmin)) {
          query['polls.' + req.query.s] = {
            $regex: `${dict[req.query.t].name}`
          };
          Session.find(query).select('polls.' + req.query.s).exec(function (err, docs) {
            if (err) {
              res.send(err);
              console.log(err);
            } else {
              res.render('feedback5', {
                data: JSON.stringify(docs),
                user: req.user
              });
            }
          });
        } else if (isAdmin ||
          (req.query.s === 'ba_2019_year1_q4_tfy' && userEmail === 'p.jones@utmn.ru') ||
          (req.query.s === 'ba_2019_year2_q4_dt' && userEmail === 'd.dusseault@utmn.ru') ||
          (req.query.s === 'ba_2019_year2_q4_gb') ||
          (req.query.s === 'ba_2019_year1_q4_history' && (userEmail === 'p.jones@utmn.ru' || userEmail === 'marat.goya@gmail.com'))

        ) {
          query['polls.' + req.query.s] = {
            $exists: true
          };
          Session.find(query).select('polls.' + req.query.s).exec(function (err, docs) {
            if (err) {
              res.send(err);
              console.log(err);
            } else {

              res.render('feedback5', {
                data: JSON.stringify(docs),
                user: req.user
              });
            }
          });
        } else {
          res.send('Access denied');
        }
      }
    }
  });

  app.get('/feedback6', isLoggedIn, function (req, res) {
    var userEmail = '';
    User.findOne({
      _id: req.user._id
    }, function (err, user) {
      if (err) { return done(err); }

      if (user) {
        userEmail = user.google.email;
        getResponse();
      } else {
        console.log('There isn\'t such user in the database');
      }
    });

    function getResponse () {
      var query = {};
      var isAdmin = false;
      if (userEmail === 'm.agliulin@utmn.ru' || userEmail === 'sasteachingcouncil@gmail.com' ||
        userEmail === 'a.shcherbenok@utmn.ru' || userEmail === 'sas_education@utmn.ru' || userEmail === 'a.rusakova@utmn.ru' ||
      userEmail === 'e.selikhovkina@utmn.ru' || userEmail === 'i.telipko@utmn.ru') {
        isAdmin = true;
      }

      if (req.query.s === 'ba_2020_q1_electives') {
        if (req.query.t && (userEmail === dict[req.query.t].email || isAdmin)) {
          Session.find({
            $or: [{
              'polls.ba_2020_q1_elective1': {
                $regex: `${dict[req.query.t].name}`
              }
            },
            {
              'polls.ba_2020_q1_elective2': {
                $regex: `${dict[req.query.t].name}`
              }
            },
            {
              'polls.ba_2020_q1_elective3': {
                $regex: `${dict[req.query.t].name}`
              }
            },
            {
              'polls.ba_2020_q1_major3': {
                $regex: `${dict[req.query.t].name}`
              }
            },
            {
              'polls.ba_2020_q1_major1': {
                $regex: `${dict[req.query.t].name}`
              }
            },
            {
              'polls.ba_2020_q1_major2': {
                $regex: `${dict[req.query.t].name}`
              }
            }
            ]
          }, {
            'polls.ba_2020_q1_elective1': 1,
            'polls.ba_2020_q1_elective2': 1,
            'polls.ba_2020_q1_elective3': 1,
            'polls.ba_2020_q1_major3': 1,
            'polls.ba_2020_q1_major1': 1,
            'polls.ba_2020_q1_major2': 1
          }).exec(function (err, docs) {
            if (err) {
              res.send(err);
              console.log(err);
            } else {

              // docs.map((el) => {
              //   console.log(el._doc.polls);
              // });

              res.render('feedback6', {
                data: JSON.stringify(docs),
                user: req.user
              });
            }
          });
        } else if (isAdmin) {
          Session.find({
            $or: [{
              'polls.ba_2020_q1_elective1': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_q1_elective2': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_q1_elective3': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_q1_major3': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_q1_major1': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_q1_major2': {
                $exists: true
              }
            }
            ]
          }, {
            'polls.ba_2020_q1_elective1': 1,
            'polls.ba_2020_q1_elective2': 1,
            'polls.ba_2020_q1_elective3': 1,
            'polls.ba_2020_q1_major3': 1,
            'polls.ba_2020_q1_major1': 1,
            'polls.ba_2020_q1_major2': 1
          }).exec(function (err, docs) {
            if (err) {
              res.send(err);
              console.log(err);
            } else {
              // docs.map((el) => {
              //   console.log(el._doc.polls);
              // });

              res.render('feedback6', {
                data: JSON.stringify(docs),
                user: req.user
              });
            }
          });
        } else {
          res.send('Access denied');
        }
      } else if (req.query.s === 'all') {
        if (isAdmin) {
          Session.find({
            $or: [{
              'polls.ba_2020_q1_elective1': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_q1_elective2': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_q1_elective3': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_q1_major1': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_q1_major2': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_q1_major3': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_year1_q1_wtai': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_year1_q1_qm': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_year1_q1_esl': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_year2_q1_poms': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_year2_q1_art': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_year2_q1_aw': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_year4_q1_ec': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_q1_rs': {
                $exists: true
              }
            },
            {
              'polls.ma_2020_year1_q1_mfc': {
                $exists: true
              }
            },
            {
              'polls.ma_2020_year1_q1_ffh1': {
                $exists: true
              }
            },
            {
              'polls.ma_2020_year1_q1_pci': {
                $exists: true
              }
            },
            {
              'polls.ma_2020_year1_q1_ae': {
                $exists: true
              }
            },
            {
              'polls.ma_2020_year2_q1_tpir': {
                $exists: true
              }
            },
            {
              'polls.ma_2020_year2_q1_me': {
                $exists: true
              }
            },
            {
              'polls.ma_xhe_2020_year1_q1_mu': {
                $exists: true
              }
            },
            {
              'polls.ma_xhe_2020_year1_q1_phok': {
                $exists: true
              }
            },
            {
              'polls.ma_xhe_2020_year1_q1_fl': {
                $exists: true
              }
            },
            {
              'polls.ma_xhe_2020_year1_q1_ps1': {
                $exists: true
              }
            }
            ]
          }).select('polls').sort({
            _id: -1
          }).limit(2000).exec(function (err, docs) {
            if (err) {
              res.send(err);
              console.log(err);
            } else {

              res.render('feedback6', {
                data: JSON.stringify(docs),
                user: req.user
              });
            }
          });
        } else {
          res.render('feedback6', {
            user: req.user
          });
        }
      } else {
        if (req.query.t && (userEmail === dict[req.query.t].email || isAdmin)) {
          query['polls.' + req.query.s] = {
            $regex: `${dict[req.query.t].name}`
          };
          Session.find(query).select('polls.' + req.query.s).exec(function (err, docs) {
            if (err) {
              res.send(err);
              console.log(err);
            } else {

              res.render('feedback6', {
                data: JSON.stringify(docs),
                user: req.user
              });
            }
          });
        } else if (isAdmin ||
          (req.query.s === 'ba_2020_year2_q1_poms' && (userEmail === 'a.arslan@utmn.ru' || userEmail === 'g.andreoletti@utmn.ru' || userEmail === 'k.mutkhukumarappan@utmn.ru')) ||
          userEmail === 'marat.goya@gmail.com')
 {
          query['polls.' + req.query.s] = {
            $exists: true
          };
          Session.find(query).select('polls.' + req.query.s).exec(function (err, docs) {
            if (err) {
              res.send(err);
              console.log(err);
            } else {
              res.render('feedback6', {
                data: JSON.stringify(docs),
                user: req.user
              });
            }
          });
        } else {
          res.send('Access denied');
        }
      }
    }
  });
};
