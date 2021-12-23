module.exports = function (app, Session, User, transporter, isLoggedIn, logger) {
  var dict = {
    Vervoort: {
      name: 'Louis Vervoort',
      email: 'l.vervoort@utmn.ru'
    },
    Reshe: {
      name: 'Julie Reshe',
      email: 'j.reshe@utmn.ru'
    },
    Jones: {
      name: 'Peter Jones',
      email: 'p.jones@utmn.ru'
    },
    Burbo: {
      name: 'Eva Burbo',
      email: 'e.burbo@utmn.ru'
    },
    Daniel: {
      name: 'Daniel Kontowski',
      email: 'd.kontowski@utmn.ru'
    },
    Kontowski: {
      name: 'Daniel Kontowski',
      email: 'd.kontowski@utmn.ru'
    },
    Corinne: {
      name: 'Corinne Doria',
      email: 'c.doria@utmn.ru'
    },
    Doria: {
      name: 'Corinne Doria',
      email: 'c.doria@utmn.ru'
    },
    Thinking: {
      name: 'Thinking on Paper',
      email: 'melina.aarnikoivu@gmail.com'
    },
    Speaking: {
      name: 'Public Speaking',
      email: 'melina.aarnikoivu@gmail.com'
    },
    Alexander: {
      name: 'Alexander Didenko',
      email: 'alexander.didenko@gmail.com'
    },
    Didenko: {
      name: 'Alexander Didenko',
      email: 'alexander.didenko@gmail.com'
    },
    Erika: {
      name: 'Erika Wolf',
      email: 'e.wolf@utmn.ru'
    },
    Wolf: {
      name: 'Erika Wolf',
      email: 'e.wolf@utmn.ru'
    },
    Jan: {
      name: 'Jan Krasni',
      email: 'y.krasni@utmn.ru'
    },
    Lysenko: {
      name: 'Alexei Lysenko',
      email: 'aflysenko@gmail.com '
    },
    Tomasz: {
      name: 'Tomasz Blusiewicz',
      email: 't.blusiewicz@utmn.ru'
    },
    Blusiewicz: {
      name: 'Tomasz Blusiewicz',
      email: 't.blusiewicz@utmn.ru'
    },
    Berdiugina: {
      name: 'Oksana Berdiugina',
      email: 'o.n.berdyugina@utmn.ru'
    },
    Platonov: {
      name: 'Maksim Platonov',
      email: 'm.l.platonov@utmn.ru'
    },
    Sharmin: {
      name: 'Dmitry Sharmin',
      email: 'd.v.sharmin@utmn.ru'
    },
    Ufukova: {
      name: 'Olga Ufukova',
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
    Andreoletti: {
      name: 'Giacomo Andreoletti',
      email: 'g.andreoletti@utmn.ru'
    },
    Jay: {
      name: 'Jay Silverstein',
      email: 'j.silverstein@utmn.ru'
    },
    Silverstein: {
      name: 'Jay Silverstein',
      email: 'j.silverstein@utmn.ru'
    },
    Taisya: {
      name: 'Taisya Pogodaeva',
      email: 't.v.pogodaeva@utmn.ru'
    },
    Pogodaeva: {
      name: 'Taisya Pogodaeva',
      email: 't.v.pogodaeva@utmn.ru'
    },
    Shcherbenok: {
      name: 'Andrey Shcherbenok',
      email: 'a.shcherbenok@utmn.ru'
    },
    Arslan: {
      name: 'Ayla Arslan',
      email: 'a.arslan@utmn.ru'
    },
    Aarnikoivu: {
      name: 'Melina Aarnikoivu',
      email: 'melina.aarnikoivu@gmail.com'
    },
    Usvitskiy: {
      name: 'Alexander Usvitskiy',
      email: 'a.usvitskiy@utmn.ru'
    },
    Usviskiy: {
      name: 'Alexander Usviskiy',
      email: 'a.usvitskiy@utmn.ru'
    },
    Lesnik: {
      name: 'Peter Lesnik',
      email: 'p.leshnik@utmn.ru'
    },
    Medvedev: {
      name: 'Alexandr Medvedev',
      email: 'a.a.medvedev@utmn.ru'
    },
    Prischepa: {
      name: 'Vladimir Prischepa',
      email: 'prischepa.vladimirr@gmail.com'
    },
    Skiba: {
      name: 'Victor Skiba',
      email: 'victor.skiba@studdb.ru'
    },
    Zmeev: {
      name: 'Denis Zmeev',
      email: 'zmdeol@gmail.com'
    },
    Kolozaridi: {
      name: 'Polina Kolozaridi',
      email: 'poli.kolozaridi@gmail.com'
    },
    Unangst: {
      name: 'Lisa Unangst',
      email: 'lisa.unangst@gmail.com'
    },
    Melnyk: {
      name: 'Dara Melnyk',
      email: 'd.melnyk@utmn.ru'
    },
    Turk: {
      name: 'Marko Turk',
      email: 'm.turk@utmn.ru'
    },
    Syrchina: {
      name: 'Anna Syrchina',
      email: 'a.s.syrchina@utmn.ru'
    },
    Parakhina: {
      name: 'Irina Parakhina',
      email: 'i.s.parakhina@utmn.ru'
    },
    Smagina: {
      name: 'Yana Smagina',
      email: 'yvsmagina@gmail.com'
    },
    Azeri: {
      name: 'Siyaves Azeri',
      email: 's.azeri@utmn.ru'
    },
    Krishna: {
      name: 'Krishna K',
      email: 'k.mutkhukumarappan@utmn.ru'
    },
    Trakhtenberg: {
      name: 'Vera Trakhtenberg',
      email: 'vatrakhtenberg@gmail.com'
    },
    Reeves: {
      name: 'Joshua Reeves',
      email: 'reevejos@oregonstate.edu'
    },
    Antosik: {
      name: 'Lyubov Antosik',
      email: 'l.antosik@utmn.ru'
    },
    Lie: {
      name: 'Sulgi Lie',
      email: 'sulgilie07@gmail.com'
    },
    Dobrovidova: {
      name: 'Olga Dobrovidova',
      email: 'dobrovidova@gmail.com'
    },
    Servant: {
      name: 'Ginie Servant',
      email: 'g.servant'
    },
    Zhikharevich: {
      name: 'Dmitry Zhikharevich',
      email: 'dzhikhar@gmail.com'
    },
    Markova: {
      name: 'Yana Markova',
      email: 'iana.caerulea@gmail.com'
    },
    Panayotov: {
      name: 'Stanimir Panayotov',
      email: 's.panayotov@utmn.ru'
    },
    Akhapkin: {
      name: 'Denis Akhapkin',
      email: 'denis.akhapkin@gmail.com'
    },
    Orlov: {
      name: 'Vladimir Orlov',
      email: 'v.orlov05@gmail.com'
    },
    Lysenko: {
      name: 'Aleksey Lysenko',
      email: 'aflysenko@gmail.com'
    },
    Tarasov: {
      name: 'Pavel Tarasov',
      email: 'ptarasovhseru@gmail.com'
    },
    Pásztor: {
      name: 'Erzsébet Pásztor',
      email: 'e.pasztor@utmn.ru'
    },
    Pasztor: {
      name: 'Erzsebet Pasztor',
      email: 'e.pasztor@utmn.ru'
    },
    Szadkowski: {
      name: 'Krystian Szadkowski',
      email: 'szadkowski.k@gmail.com'
    },
    Prakhov: {
      name: 'Ilya Prakhov',
      email: 'ipra@inbox.ru'
    },
    Titova: {
      name: 'Titova Ekaterina',
      email: 'e.titova.xhe@gmail.com'
    },
    Longden: {
      name: 'Joanna Longden',
      email: 'j.longden@ucl.ac.uk'
    },
    Kalinin: {
      name: 'Ilya Kalinin',
      email: 'ilya_kalinin@mail.ru'
    },
    Sadovina: {
      name: 'Irina Sadovina',
      email: 'irina.sadovina@gmail.com'
    },
    Wintersgill: {
      name: 'Caroline Wintersgill',
      email: 'caroline.wintersgill@gmail.com'
    },
    Tankhilevich: {
      name: 'Alexander Tankhilevich',
      email: 'alextankhilevich@gmail.com'
    },
    Tung: {
      name: 'Tung Tung Chan',
      email: 'chan@eur.nl'
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
      }).limit(1000).exec(function (err, docs) {
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
    var teacher = null;
    if (req.query.t) teacher = decodeURIComponent(req.query.t);
    User.findOne({
      _id: req.user._id
    }, function (err, user) {
      if (err) { return done(err); }

      if (user && user.google) {
        userEmail = user.google.email;
        getResponse();
      } else {
        console.log('There isn\'t such user in the database');
      }
    });

    function getResponse () {
      var query = {};
      var isAdmin = false;
      if (userEmail === 'm.agliulin@utmn.ru' || userEmail === 'a.zalyaletdinova.sas@gmail.com' || userEmail === 'e.ermakova@utmn.ru' || userEmail === 'sasteachingcouncil@gmail.com' || userEmail === 'e.wolf@utmn.ru' ||
        userEmail === 'a.shcherbenok@utmn.ru' || userEmail === 'sas_education@utmn.ru' || userEmail === 'sas.tc@utmn.ru' || userEmail === 'a.rusakova@utmn.ru' ||
      userEmail === 'e.selikhovkina@utmn.ru' || userEmail === 'i.telipko@utmn.ru') {
        isAdmin = true;
      }

      if (req.query.s === 'ba_2019_electives' && (teacher && (userEmail === dict[teacher].email || isAdmin))) {
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
        }).limit(1000).exec(function (err, docs) {
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
    var teacher = null;
    if (req.query.t) teacher = decodeURIComponent(req.query.t);
    User.findOne({
      _id: req.user._id
    }, function (err, user) {
      if (err) { return done(err); }

      if (user && user.google) {
        userEmail = user.google.email;
        getResponse();
      } else {
        console.log('There isn\'t such user in the database');
      }
    });

    function getResponse () {
      var query = {};
      var isAdmin = false;
      if (userEmail === 'm.agliulin@utmn.ru' || userEmail === 'a.zalyaletdinova.sas@gmail.com' || userEmail === 'e.ermakova@utmn.ru' || userEmail === 'sasteachingcouncil@gmail.com' || userEmail === 'e.wolf@utmn.ru' ||
        userEmail === 'a.shcherbenok@utmn.ru' || userEmail === 'sas_education@utmn.ru' || userEmail === 'sas.tc@utmn.ru' || userEmail === 'a.rusakova@utmn.ru' ||
      userEmail === 'e.selikhovkina@utmn.ru' || userEmail === 'i.telipko@utmn.ru') {
        isAdmin = true;
      }

      if (req.query.s === 'ba_2019_q2_electives' && (teacher && (userEmail === dict[teacher].email || isAdmin))) {
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
        }).limit(1000).exec(function (err, docs) {
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
    var teacher = null;
    if (req.query.t) teacher = decodeURIComponent(req.query.t);
    User.findOne({
      _id: req.user._id
    }, function (err, user) {
      if (err) { return done(err); }

      if (user && user.google) {
        userEmail = user.google.email;
        getResponse();
      } else {
        console.log('There isn\'t such user in the database');
      }
    });

    function getResponse () {
      var query = {};
      var isAdmin = false;
      if (userEmail === 'd.kontowski@utmn.ru' || userEmail === 'm.agliulin@utmn.ru' || userEmail === 'a.zalyaletdinova.sas@gmail.com' || userEmail === 'e.ermakova@utmn.ru' || userEmail === 'sasteachingcouncil@gmail.com' || userEmail === 'e.wolf@utmn.ru' ||
        userEmail === 'a.shcherbenok@utmn.ru' || userEmail === 'sas_education@utmn.ru' || userEmail === 'sas.tc@utmn.ru' || userEmail === 'a.rusakova@utmn.ru' ||
      userEmail === 'e.selikhovkina@utmn.ru' || userEmail === 'i.telipko@utmn.ru') {
        isAdmin = true;
      }

      if (req.query.s === 'ba_2019_q3_electives') {
        if (teacher && (userEmail === dict[teacher].email || isAdmin)) {
          Session.find({
            $or: [{
              'polls.ba_2019_q3_elective1': {
                $regex: `${dict[teacher].name}`
              }
            },
            {
              'polls.ba_2019_q3_elective2': {
                $regex: `${dict[teacher].name}`
              }
            },
            {
              'polls.ba_2019_q3_major3': {
                $regex: `${dict[teacher].name}`
              }
            },
            {
              'polls.ba_2019_q3_major1': {
                $regex: `${dict[teacher].name}`
              }
            },
            {
              'polls.ba_2019_q3_major2': {
                $regex: `${dict[teacher].name}`
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
          }).limit(1000).exec(function (err, docs) {
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
        if (teacher && (userEmail === dict[teacher].email || isAdmin)) {
          query['polls.' + req.query.s] = {
            $regex: `${dict[teacher].name}`
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
    var teacher = null;
    if (req.query.t) teacher = decodeURIComponent(req.query.t);
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
      if (userEmail === 'm.agliulin@utmn.ru' || userEmail === 'a.zalyaletdinova.sas@gmail.com' || userEmail === 'e.ermakova@utmn.ru' || userEmail === 'sasteachingcouncil@gmail.com' || userEmail === 'e.wolf@utmn.ru' ||
        userEmail === 'a.shcherbenok@utmn.ru' || userEmail === 'sas_education@utmn.ru' || userEmail === 'sas.tc@utmn.ru' || userEmail === 'a.rusakova@utmn.ru' ||
      userEmail === 'e.selikhovkina@utmn.ru' || userEmail === 'i.telipko@utmn.ru') {
        isAdmin = true;
      }

      if (req.query.s === 'ba_2019_q4_electives') {
        if (teacher && (userEmail === dict[teacher].email || isAdmin)) {
          Session.find({
            $or: [{
              'polls.ba_2019_q4_elective1': {
                $regex: `${dict[teacher].name}`
              }
            },
            {
              'polls.ba_2019_q4_elective2': {
                $regex: `${dict[teacher].name}`
              }
            },
            {
              'polls.ba_2019_q4_elective3': {
                $regex: `${dict[teacher].name}`
              }
            },
            {
              'polls.ba_2019_q4_major3': {
                $regex: `${dict[teacher].name}`
              }
            },
            {
              'polls.ba_2019_q4_major1': {
                $regex: `${dict[teacher].name}`
              }
            },
            {
              'polls.ba_2019_q4_major2': {
                $regex: `${dict[teacher].name}`
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
          }).limit(800).exec(function (err, docs) {
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
        if (teacher && (userEmail === dict[teacher].email || isAdmin)) {
          query['polls.' + req.query.s] = {
            $regex: `${dict[teacher].name}`
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
    var teacher = null;
    if (req.query.t) teacher = decodeURIComponent(req.query.t);
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
      if (userEmail === 'm.agliulin@utmn.ru' || userEmail === 'a.zalyaletdinova.sas@gmail.com' || userEmail === 'e.ermakova@utmn.ru' || userEmail === 'sasteachingcouncil@gmail.com' || userEmail === 'e.wolf@utmn.ru' ||
        userEmail === 'a.shcherbenok@utmn.ru' || userEmail === 'sas_education@utmn.ru' || userEmail === 'sas.tc@utmn.ru' || userEmail === 'a.rusakova@utmn.ru' ||
      userEmail === 'e.selikhovkina@utmn.ru' || userEmail === 'i.telipko@utmn.ru') {
        isAdmin = true;
      }

      if (req.query.s === 'ba_2020_q1_electives') {
        if (teacher && dict[teacher] && (userEmail === dict[teacher].email || isAdmin)) {
          Session.find({
            $or: [{
              'polls.ba_2020_q1_elective1': {
                $regex: `${dict[teacher].name}`
              }
            },
            {
              'polls.ba_2020_q1_elective2': {
                $regex: `${dict[teacher].name}`
              }
            },
            {
              'polls.ba_2020_q1_elective3': {
                $regex: `${dict[teacher].name}`
              }
            },
            {
              'polls.ba_2020_q1_major3': {
                $regex: `${dict[teacher].name}`
              }
            },
            {
              'polls.ba_2020_q1_major1': {
                $regex: `${dict[teacher].name}`
              }
            },
            {
              'polls.ba_2020_q1_major2': {
                $regex: `${dict[teacher].name}`
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
        if (teacher && dict[teacher] && (userEmail === dict[teacher].email || isAdmin)) {
          query['polls.' + req.query.s] = {
            $regex: `${dict[teacher].name}`
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
          userEmail === 'marat.goya@gmail.com') {
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
  app.get('/feedback7', isLoggedIn, function (req, res) {
    var userEmail = '';
    var teacher = null;
    if (req.query.t) teacher = decodeURIComponent(req.query.t);
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
      if (userEmail === 'm.agliulin@utmn.ru' || userEmail === 'a.zalyaletdinova.sas@gmail.com' || userEmail === 'e.ermakova@utmn.ru' || userEmail === 'sasteachingcouncil@gmail.com' || userEmail === 'e.wolf@utmn.ru' ||
        userEmail === 'a.shcherbenok@utmn.ru' || userEmail === 'sas_education@utmn.ru' || userEmail === 'sas.tc@utmn.ru' || userEmail === 'a.rusakova@utmn.ru' ||
      userEmail === 'e.selikhovkina@utmn.ru' || userEmail === 'i.telipko@utmn.ru') {
        isAdmin = true;
      }

      if (req.query.s === 'ba_2020_q2_electives') {
        if (teacher && (checkTeachersAccess(dict, teacher, userEmail) || isAdmin)) {
          Session.find({
            $or: [{
              'polls.ba_2020_q2_elective1': {
                $regex: `${teacher}`
              }
            },
            {
              'polls.ba_2020_q2_elective2': {
                $regex: `${teacher}`
              }
            },
            {
              'polls.ba_2020_q2_elective3': {
                $regex: `${teacher}`
              }
            },
            {
              'polls.ba_2020_q2_elective4': {
                $regex: `${teacher}`
              }
            },
            {
              'polls.ba_2020_q2_major3': {
                $regex: `${teacher}`
              }
            },
            {
              'polls.ba_2020_q2_major1': {
                $regex: `${teacher}`
              }
            },
            {
              'polls.ba_2020_q2_major2': {
                $regex: `${teacher}`
              }
            }
            ]
          }, {
            'polls.ba_2020_q2_elective1': 1,
            'polls.ba_2020_q2_elective2': 1,
            'polls.ba_2020_q2_elective3': 1,
            'polls.ba_2020_q2_elective4': 1,
            'polls.ba_2020_q2_major3': 1,
            'polls.ba_2020_q2_major1': 1,
            'polls.ba_2020_q2_major2': 1
          }).exec(function (err, docs) {
            if (err) {
              res.send(err);
              console.log(err);
            } else {
              // docs.map((el) => {
              //   console.log(el._doc.polls);
              // });

              res.render('feedback7', {
                data: JSON.stringify(docs),
                user: req.user
              });
            }
          });
        } else if (isAdmin) {
          Session.find({
            $or: [{
              'polls.ba_2020_q2_elective1': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_q2_elective2': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_q2_elective3': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_q2_elective4': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_q2_major3': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_q2_major1': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_q2_major2': {
                $exists: true
              }
            }
            ]
          }, {
            'polls.ba_2020_q2_elective1': 1,
            'polls.ba_2020_q2_elective2': 1,
            'polls.ba_2020_q2_elective3': 1,
            'polls.ba_2020_q2_elective4': 1,
            'polls.ba_2020_q2_major3': 1,
            'polls.ba_2020_q2_major1': 1,
            'polls.ba_2020_q2_major2': 1
          }).exec(function (err, docs) {
            if (err) {
              res.send(err);
              console.log(err);
            } else {
              // docs.map((el) => {
              //   console.log(el._doc.polls);
              // });

              res.render('feedback7', {
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
              'polls.ba_2020_q2_elective1': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_q2_elective2': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_q2_elective3': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_q2_elective4': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_q2_major1': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_q2_major2': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_q2_major3': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_q2_esl': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_year1_q2_qm': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_q2_eps': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_q2_elective1': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_q2_elective2': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_q2_elective3': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_q2_elective4': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_q2_major1': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_q2_major2': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_q2_major3': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_year1_q2_fys': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_year1_q2_qm': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_year1_q2_esl': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_year1_q2_history': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_year1_q2_gb': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_year2_q2_poms': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_year2_q2_art': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_year2_q2_gi': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_year4_q2_ec': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_q2_rs': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_q2_rscommon': {
                $exists: true
              }
            },
            {
              'polls.ma_2020_year1_q2_phvs': {
                $exists: true
              }
            },
            {
              'polls.ma_2020_year1_q2_dpp': {
                $exists: true
              }
            },
            {
              'polls.ma_2020_year2_q2_ssp': {
                $exists: true
              }
            },
            {
              'polls.ma_2020_year2_q2_vrtp': {
                $exists: true
              }
            },
            {
              'polls.ma_2020_year2_q2_sm': {
                $exists: true
              }
            },
            {
              'polls.ma_2020_year2_q2_mc': {
                $exists: true
              }
            },
            {
              'polls.ma_2020_year2_q2_gd': {
                $exists: true
              }
            },
            {
              'polls.ma_2020_year2_q2_nn': {
                $exists: true
              }
            },
            {
              'polls.ma_xhe_2020_year1_q2_aph1': {
                $exists: true
              }
            },
            {
              'polls.ma_xhe_2020_year1_q2_oa1': {
                $exists: true
              }
            },
            {
              'polls.ma_xhe_2020_year1_q2_id': {
                $exists: true
              }
            },
            {
              'polls.ma_xhe_2020_year1_q2_ps2': {
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
              res.render('feedback7', {
                data: JSON.stringify(docs),
                user: req.user
              });
            }
          });
        } else {
          res.render('feedback7', {
            user: req.user
          });
        }
      } else {
        if (teacher && (checkTeachersAccess(dict, teacher, userEmail) || isAdmin)) {
          query['polls.' + req.query.s] = {
            $regex: `${teacher}`
          };
          Session.find(query).select('polls.' + req.query.s).exec(function (err, docs) {
            if (err) {
              res.send(err);
              console.log(err);
            } else {
              res.render('feedback7', {
                data: JSON.stringify(docs),
                user: req.user
              });
            }
          });
        } else if (!teacher && isAdmin) {
          query['polls.' + req.query.s] = {
            $exists: true
          };
          Session.find(query).select('polls.' + req.query.s).exec(function (err, docs) {
            if (err) {
              res.send(err);
              console.log(err);
            } else {
              res.render('feedback7', {
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
  app.get('/feedback8', isLoggedIn, function (req, res) {
    var userEmail = '';
    var teacher = null;
    if (req.query.t) teacher = decodeURIComponent(req.query.t);
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
      if (userEmail === 'm.agliulin@utmn.ru' || userEmail === 'a.zalyaletdinova.sas@gmail.com' || userEmail === 'e.ermakova@utmn.ru' || userEmail === 'sasteachingcouncil@gmail.com' || userEmail === 'e.wolf@utmn.ru' ||
        userEmail === 'a.shcherbenok@utmn.ru' || userEmail === 'sas_education@utmn.ru' || userEmail === 'sas.tc@utmn.ru' || userEmail === 'a.rusakova@utmn.ru' || userEmail === 'i.telipko@utmn.ru') {
        isAdmin = true;
      }

      if (req.query.s === 'ba_2020_q3_electives') {
        if (teacher && (checkTeachersAccess(dict, teacher, userEmail) || isAdmin)) {
          Session.find({
            $or: [{
              'polls.ba_2020_q3_elective1': {
                $regex: `${teacher}`
              }
            },
            {
              'polls.ba_2020_q3_elective2': {
                $regex: `${teacher}`
              }
            },
            {
              'polls.ba_2020_q3_elective3': {
                $regex: `${teacher}`
              }
            },
            {
              'polls.ba_2020_q3_elective4': {
                $regex: `${teacher}`
              }
            },
            {
              'polls.ba_2020_q3_major3': {
                $regex: `${teacher}`
              }
            },
            {
              'polls.ba_2020_q3_major1': {
                $regex: `${teacher}`
              }
            },
            {
              'polls.ba_2020_q3_major2': {
                $regex: `${teacher}`
              }
            }
            ]
          }, {
            'polls.ba_2020_q3_elective1': 1,
            'polls.ba_2020_q3_elective2': 1,
            'polls.ba_2020_q3_elective3': 1,
            'polls.ba_2020_q3_elective4': 1,
            'polls.ba_2020_q3_major3': 1,
            'polls.ba_2020_q3_major1': 1,
            'polls.ba_2020_q3_major2': 1
          }).exec(function (err, docs) {
            if (err) {
              res.send(err);
              console.log(err);
            } else {
              // docs.map((el) => {
              //   console.log(el._doc.polls);
              // });

              res.render('feedback8', {
                data: JSON.stringify(docs),
                user: req.user
              });
            }
          });
        } else if (isAdmin) {
          Session.find({
            $or: [{
              'polls.ba_2020_q3_elective1': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_q3_elective2': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_q3_elective3': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_q3_elective4': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_q3_major3': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_q3_major1': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_q3_major2': {
                $exists: true
              }
            }
            ]
          }, {
            'polls.ba_2020_q3_elective1': 1,
            'polls.ba_2020_q3_elective2': 1,
            'polls.ba_2020_q3_elective3': 1,
            'polls.ba_2020_q3_elective4': 1,
            'polls.ba_2020_q3_major3': 1,
            'polls.ba_2020_q3_major1': 1,
            'polls.ba_2020_q3_major2': 1
          }).exec(function (err, docs) {
            if (err) {
              res.send(err);
              console.log(err);
            } else {
              // docs.map((el) => {
              //   console.log(el._doc.polls);
              // });

              res.render('feedback8', {
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
            $or: [
              {
                'polls.ba_2021_year2_q3_gb_1': {
                  $exists: true
                }
              },
              {
                'polls.ba_2021_year2_q3_gb_2': {
                  $exists: true
                }
              },
              {
                'polls.ba_2021_year2_q3_gb_3': {
                  $exists: true
                }
              },
              {
                'polls.ba_2021_year2_q3_gb_4': {
                  $exists: true
                }
              },
              {
                'polls.ba_2020_q3_elective1': {
                  $exists: true
                }
              },
              {
                'polls.ba_2020_q3_elective2': {
                  $exists: true
                }
              },
              {
                'polls.ba_2020_q3_elective3': {
                  $exists: true
                }
              },
              {
                'polls.ba_2020_q3_elective4': {
                  $exists: true
                }
              },
              {
                'polls.ba_2020_q3_major1': {
                  $exists: true
                }
              },
              {
                'polls.ba_2020_q3_major2': {
                  $exists: true
                }
              },
              {
                'polls.ba_2020_q3_major3': {
                  $exists: true
                }
              },
              {
                'polls.ba_2020_year1_q3_esl': {
                  $exists: true
                }
              },
              {
                'polls.ba_2020_year1_q3_history': {
                  $exists: true
                }
              },
              {
                'polls.ba_2020_year1_q3_gb': {
                  $exists: true
                }
              },
              {
                'polls.ba_2020_year1_q3_it': {
                  $exists: true
                }
              },
              {
                'polls.ba_2020_year1_q3_aw': {
                  $exists: true
                }
              },
              {
                'polls.ba_2020_year2_q3_dt': {
                  $exists: true
                }
              },
              {
                'polls.ba_2020_year4_q3_ec': {
                  $exists: true
                }
              },
              {
                'polls.ba_2020_q3_rscommon': {
                  $exists: true
                }
              },
              {
                'polls.ba_2020_q3_rs': {
                  $exists: true
                }
              },
              {
                'polls.ma_2020_year1_q3_md': {
                  $exists: true
                }
              },
              {
                'polls.ma_2020_year1_q3_ca': {
                  $exists: true
                }
              },
              {
                'polls.ma_2020_year2_q3_rds': {
                  $exists: true
                }
              },
              {
                'polls.ma_xhe_2020_year1_q3_aph2': {
                  $exists: true
                }
              },
              {
                'polls.ma_xhe_2020_year1_q3_tl': {
                  $exists: true
                }
              },
              {
                'polls.ma_xhe_2020_year1_q3_oa': {
                  $exists: true
                }
              },
              {
                'polls.ma_xhe_2020_year1_q3_ehe': {
                  $exists: true
                }
              },
              {
                'polls.ma_xhe_2020_year1_q3_ps3': {
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
              res.render('feedback8', {
                data: JSON.stringify(docs),
                user: req.user
              });
            }
          });
        } else {
          res.render('feedback8', {
            user: req.user
          });
        }
      } else {
        if (teacher && (checkTeachersAccess(dict, teacher, userEmail) || isAdmin)) {
          query['polls.' + req.query.s] = {
            $regex: `${teacher}`
          };
          Session.find(query).select('polls.' + req.query.s).exec(function (err, docs) {
            if (err) {
              res.send(err);
              console.log(err);
            } else {
              res.render('feedback8', {
                data: JSON.stringify(docs),
                user: req.user
              });
            }
          });
        } else if (!teacher && isAdmin) {
          query['polls.' + req.query.s] = {
            $exists: true
          };
          Session.find(query).select('polls.' + req.query.s).exec(function (err, docs) {
            if (err) {
              res.send(err);
              console.log(err);
            } else {
              res.render('feedback8', {
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
  app.get('/feedback9', isLoggedIn, function (req, res) {
    var userEmail = '';
    var teacher = null;
    if (req.query.t) teacher = decodeURIComponent(req.query.t);
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
      if (userEmail === 'm.agliulin@utmn.ru' || userEmail === 'a.zalyaletdinova.sas@gmail.com' || userEmail === 'e.ermakova@utmn.ru' || userEmail === 'sasteachingcouncil@gmail.com' || userEmail === 'e.wolf@utmn.ru' ||
        userEmail === 'a.shcherbenok@utmn.ru' || userEmail === 'sas_education@utmn.ru' || userEmail === 'sas.tc@utmn.ru' || userEmail === 'a.rusakova@utmn.ru' || userEmail === 'i.telipko@utmn.ru') {
        isAdmin = true;
      }

      if (req.query.s === 'ba_2020_q4_electives') {
        if (teacher && (checkTeachersAccess(dict, teacher, userEmail) || isAdmin)) {
          Session.find({
            $or: [{
              'polls.ba_2020_q4_elective1': {
                $regex: `${teacher}`
              }
            },
            {
              'polls.ba_2020_q4_elective2': {
                $regex: `${teacher}`
              }
            },
            {
              'polls.ba_2020_q4_elective3': {
                $regex: `${teacher}`
              }
            },
            {
              'polls.ba_2020_q4_elective4': {
                $regex: `${teacher}`
              }
            },
            {
              'polls.ba_2020_q4_major4': {
                $regex: `${teacher}`
              }
            },
            {
              'polls.ba_2020_q4_major3': {
                $regex: `${teacher}`
              }
            },
            {
              'polls.ba_2020_q4_major1': {
                $regex: `${teacher}`
              }
            },
            {
              'polls.ba_2020_q4_major2': {
                $regex: `${teacher}`
              }
            }
            ]
          }, {
            'polls.ba_2020_q4_elective1': 1,
            'polls.ba_2020_q4_elective2': 1,
            'polls.ba_2020_q4_elective3': 1,
            'polls.ba_2020_q4_elective4': 1,
            'polls.ba_2020_q4_major4': 1,
            'polls.ba_2020_q4_major3': 1,
            'polls.ba_2020_q4_major1': 1,
            'polls.ba_2020_q4_major2': 1
          }).exec(function (err, docs) {
            if (err) {
              res.send(err);
              console.log(err);
            } else {
              // docs.map((el) => {
              //   console.log(el._doc.polls);
              // });

              res.render('feedback9', {
                data: JSON.stringify(docs),
                user: req.user
              });
            }
          });
        } else if (isAdmin) {
          Session.find({
            $or: [{
              'polls.ba_2020_q4_elective1': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_q4_elective2': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_q4_elective3': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_q4_elective4': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_q4_major4': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_q4_major3': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_q4_major1': {
                $exists: true
              }
            },
            {
              'polls.ba_2020_q4_major2': {
                $exists: true
              }
            }
            ]
          }, {
            'polls.ba_2020_q4_elective1': 1,
            'polls.ba_2020_q4_elective2': 1,
            'polls.ba_2020_q4_elective3': 1,
            'polls.ba_2020_q4_elective4': 1,
            'polls.ba_2020_q4_major4': 1,
            'polls.ba_2020_q4_major3': 1,
            'polls.ba_2020_q4_major1': 1,
            'polls.ba_2020_q4_major2': 1
          }).exec(function (err, docs) {
            if (err) {
              res.send(err);
              console.log(err);
            } else {
              // docs.map((el) => {
              //   console.log(el._doc.polls);
              // });

              res.render('feedback9', {
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
            $or: [
              {
                'polls.ba_2021_year2_q4_gb_1': {
                  $exists: true
                }
              },
              {
                'polls.ba_2021_year2_q4_gb_2': {
                  $exists: true
                }
              },
              {
                'polls.ba_2021_year2_q4_gb_3': {
                  $exists: true
                }
              },
              {
                'polls.ba_2021_year2_q4_gb_4': {
                  $exists: true
                }
              },
              {
                'polls.ba_2020_q4_elective1': {
                  $exists: true
                }
              },
              {
                'polls.ba_2020_q4_elective2': {
                  $exists: true
                }
              },
              {
                'polls.ba_2020_q4_elective3': {
                  $exists: true
                }
              },
              {
                'polls.ba_2020_q4_elective4': {
                  $exists: true
                }
              },
              {
                'polls.ba_2020_q4_major1': {
                  $exists: true
                }
              },
              {
                'polls.ba_2020_q4_major2': {
                  $exists: true
                }
              },
              {
                'polls.ba_2020_q4_major3': {
                  $exists: true
                }
              },
              {
                'polls.ba_2020_q4_major4': {
                  $exists: true
                }
              },
              {
                'polls.ba_2020_year1_q4_esl': {
                  $exists: true
                }
              },
              {
                'polls.ba_2020_year1_q4_history': {
                  $exists: true
                }
              },
              {
                'polls.ba_2020_year1_q4_gb': {
                  $exists: true
                }
              },
              {
                'polls.ba_2020_year1_q4_it': {
                  $exists: true
                }
              },
              {
                'polls.ba_2020_year1_q4_tfy': {
                  $exists: true
                }
              },
              {
                'polls.ba_2020_year2_q4_dt': {
                  $exists: true
                }
              },
              {
                'polls.ba_2020_year4_q4_ec': {
                  $exists: true
                }
              },
              {
                'polls.ba_2020_q4_rscommon': {
                  $exists: true
                }
              },
              {
                'polls.ba_2020_q4_rs': {
                  $exists: true
                }
              },
              {
                'polls.ma_2020_year1_q4_mooc': {
                  $exists: true
                }
              },
              {
                'polls.ma_2020_year1_q4_ca': {
                  $exists: true
                }
              },
              {
                'polls.ma_2020_year2_q4_rds': {
                  $exists: true
                }
              },
              {
                'polls.ma_xhe_2020_year1_q4_gei': {
                  $exists: true
                }
              },
              {
                'polls.ma_xhe_2020_year1_q4_ps4': {
                  $exists: true
                }
              },
              {
                'polls.ma_xhe_2020_year1_q4_tl3': {
                  $exists: true
                }
              },
              {
                'polls.ma_xhe_2020_year1_q4_ehe': {
                  $exists: true
                }
              },
              {
                'polls.ma_xhe_2020_year1_q4_ps3': {
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
              res.render('feedback9', {
                data: JSON.stringify(docs),
                user: req.user
              });
            }
          });
        } else {
          res.render('feedback9', {
            user: req.user
          });
        }
      } else {
        if (teacher && (checkTeachersAccess(dict, teacher, userEmail) || isAdmin)) {
          query['polls.' + req.query.s] = {
            $regex: `${teacher}`
          };
          Session.find(query).select('polls.' + req.query.s).exec(function (err, docs) {
            if (err) {
              res.send(err);
              console.log(err);
            } else {
              res.render('feedback9', {
                data: JSON.stringify(docs),
                user: req.user
              });
            }
          });
        } else if (!teacher && isAdmin) {
          query['polls.' + req.query.s] = {
            $exists: true
          };
          Session.find(query).select('polls.' + req.query.s).exec(function (err, docs) {
            if (err) {
              res.send(err);
              console.log(err);
            } else {
              res.render('feedback9', {
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

  app.get('/feedback10', isLoggedIn, function (req, res) {
    var userEmail = '';
    var teacher = null;
    if (req.query.t) teacher = decodeURIComponent(req.query.t);
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
      if (userEmail === 'm.agliulin@utmn.ru' || userEmail === 'a.zalyaletdinova.sas@gmail.com' || userEmail === 'e.burbo@utmn.ru' || userEmail === 'sasteachingcouncil@gmail.com' || userEmail === 'e.wolf@utmn.ru' ||
        userEmail === 'a.shcherbenok@utmn.ru' || userEmail === 'sas_education@utmn.ru' || userEmail === 'sas.tc@utmn.ru' || userEmail === 'l.b.kvashnina@utmn.ru' || userEmail === 'i.telipko@utmn.ru') {
        isAdmin = true;
      }

      if (req.query.s === 'ba_2021_q1_electives') {
        if (teacher && (checkTeachersAccess(dict, teacher, userEmail) || isAdmin)) {
          Session.find({
            $or: [{
              'polls.ba_2021_q1_elective1': {
                $regex: `${teacher}`
              }
            },
            {
              'polls.ba_2021_q1_elective2': {
                $regex: `${teacher}`
              }
            },
            {
              'polls.ba_2021_q1_elective3': {
                $regex: `${teacher}`
              }
            },
            {
              'polls.ba_2021_q1_elective4': {
                $regex: `${teacher}`
              }
            },
            {
              'polls.ba_2021_q1_major4': {
                $regex: `${teacher}`
              }
            },
            {
              'polls.ba_2021_q1_major3': {
                $regex: `${teacher}`
              }
            },
            {
              'polls.ba_2021_q1_major1': {
                $regex: `${teacher}`
              }
            },
            {
              'polls.ba_2021_q1_major2': {
                $regex: `${teacher}`
              }
            }
            ]
          }, {
            'polls.ba_2021_q1_elective1': 1,
            'polls.ba_2021_q1_elective2': 1,
            'polls.ba_2021_q1_elective3': 1,
            'polls.ba_2021_q1_elective4': 1,
            'polls.ba_2021_q1_major4': 1,
            'polls.ba_2021_q1_major3': 1,
            'polls.ba_2021_q1_major1': 1,
            'polls.ba_2021_q1_major2': 1
          }).exec(function (err, docs) {
            if (err) {
              res.send(err);
              console.log(err);
            } else {
              // docs.map((el) => {
              //   console.log(el._doc.polls);
              // });

              res.render('feedback10', {
                data: JSON.stringify(docs),
                user: req.user
              });
            }
          });
        } else if (isAdmin) {
          Session.find({
            $or: [{
              'polls.ba_2021_q1_elective1': {
                $exists: true
              }
            },
            {
              'polls.ba_2021_q1_elective2': {
                $exists: true
              }
            },
            {
              'polls.ba_2021_q1_elective3': {
                $exists: true
              }
            },
            {
              'polls.ba_2021_q1_elective4': {
                $exists: true
              }
            },
            {
              'polls.ba_2021_q1_major4': {
                $exists: true
              }
            },
            {
              'polls.ba_2021_q1_major3': {
                $exists: true
              }
            },
            {
              'polls.ba_2021_q1_major1': {
                $exists: true
              }
            },
            {
              'polls.ba_2021_q1_major2': {
                $exists: true
              }
            }
            ]
          }, {
            'polls.ba_2021_q1_elective1': 1,
            'polls.ba_2021_q1_elective2': 1,
            'polls.ba_2021_q1_elective3': 1,
            'polls.ba_2021_q1_elective4': 1,
            'polls.ba_2021_q1_major4': 1,
            'polls.ba_2021_q1_major3': 1,
            'polls.ba_2021_q1_major1': 1,
            'polls.ba_2021_q1_major2': 1
          }).exec(function (err, docs) {
            if (err) {
              res.send(err);
              console.log(err);
            } else {
              // docs.map((el) => {
              //   console.log(el._doc.polls);
              // });

              res.render('feedback10', {
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
            $or: [
              {
                'polls.ba_2021_year2_q1_gb_1': {
                  $exists: true
                }
              },
              {
                'polls.ba_2021_year2_q1_gb_2': {
                  $exists: true
                }
              },
              {
                'polls.ba_2021_year2_q1_gb_3': {
                  $exists: true
                }
              },
              {
                'polls.ba_2021_year2_q1_gb_4': {
                  $exists: true
                }
              },
              {
                'polls.ba_2021_q1_elective1': {
                  $exists: true
                }
              },
              {
                'polls.ba_2021_q1_elective2': {
                  $exists: true
                }
              },
              {
                'polls.ba_2021_q1_elective3': {
                  $exists: true
                }
              },
              {
                'polls.ba_2021_q1_elective4': {
                  $exists: true
                }
              },
              {
                'polls.ba_2021_q1_major1': {
                  $exists: true
                }
              },
              {
                'polls.ba_2021_q1_major2': {
                  $exists: true
                }
              },
              {
                'polls.ba_2021_q1_major3': {
                  $exists: true
                }
              },
              {
                'polls.ba_2021_q1_major4': {
                  $exists: true
                }
              },
              {
                'polls.ba_2021_year1_q1_wtai': {
                  $exists: true
                }
              },
              {
                'polls.ba_2021_year1_q1_paideia': {
                  $exists: true
                }
              },
              {
                'polls.ba_2021_year2_q1_lam': {
                  $exists: true
                }
              },
              {
                'polls.ma_xhe_2021_year1_q1_dm': {
                  $exists: true
                }
              },
              {
                'polls.ma_xhe_2021_year1_q1_fol': {
                  $exists: true
                }
              },
              {
                'polls.ma_xhe_2021_year2_q1_che': {
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
              res.render('feedback10', {
                data: JSON.stringify(docs),
                user: req.user
              });
            }
          });
        } else {
          res.render('feedback10', {
            user: req.user
          });
        }
      } else {
        if (teacher && (checkTeachersAccess(dict, teacher, userEmail) || isAdmin)) {
          query['polls.' + req.query.s] = {
            $regex: `${teacher}`
          };
          Session.find(query).select('polls.' + req.query.s).exec(function (err, docs) {
            if (err) {
              res.send(err);
              console.log(err);
            } else {
              res.render('feedback10', {
                data: JSON.stringify(docs),
                user: req.user
              });
            }
          });
        } else if (!teacher && isAdmin) {
          query['polls.' + req.query.s] = {
            $exists: true
          };
          Session.find(query).select('polls.' + req.query.s).exec(function (err, docs) {
            if (err) {
              res.send(err);
              console.log(err);
            } else {
              res.render('feedback10', {
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

function checkTeachersAccess (dict, teachers, userEmail) {
  const teacherWithoutCommas = teachers.replace(/,/g, '').replace(/ — /g, ' ');
  let accessPermitted = false;
  const teachersArray = teacherWithoutCommas.split(' ');
  console.log(teachersArray);
  teachersArray.forEach(function (teacher) {
    if (dict[teacher] && userEmail === dict[teacher].email) {
      accessPermitted = true;
    }
  });
  console.log(accessPermitted);
  return accessPermitted;
}
