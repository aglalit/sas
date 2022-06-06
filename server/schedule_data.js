module.exports = function (app, Schedule, logger) {
  app.post('/schedule_data_0382473723', function (req, res) {
    Schedule.findOne({}, function (err, data) {
      if (err) { res.send(err); console.log(err); } else {
        data.schedule = JSON.stringify(req.body);
        data.save(function (err) {
          if (err) { return console.error(err); }
        });
        res.send('200');
      }
    });
  });

  let data_manual = JSON.parse('{"PitB":{"09:00":[["","","","","",""]],"09:30":[["","","","","",""]],"10:00":[["","","","","",""]],"10:30":[["","","","Olga Dobrovidova(10.40-11.40) ","",""]],"11:00":[["","","","Olga Dobrovidova(10.40-11.40) ","","Krishna-K"]],"11:30":[["","Andrey Shcherbenok","Eva Burbo","","","Krishna-K"]],"12:00":[["","Andrey Shcherbenok","Eva Burbo","","Dara Melnyk","Krishna-K "]],"12:30":[["Marko Turk","Jay Silverstein","Irina Karabanova ","Peter Lesnik ","Dara Melnyk","Krishna-K"]],"13:00":[["Marko Turk","Jay Silverstein","Irina Karabanova / Joanna Longden\\n\\n","Peter Lesnik ","Alexander Usvitskiy",""]],"13:30":[["","","Joanna Longden\\n","","Alexander Usvitskiy",""]],"14:00":[["","","","","",""]],"14:30":[["","","","Azeri Siyaves(14.20-15.50)","",""]],"15:00":[["","","","Azeri Siyaves","",""]],"15:30":[["","","","Azeri Siyaves","",""]],"16:00":[["Louis Vervoort\\n","Ksenia Popenko","","Erzsebet Pásztor ","Lysenko Aleksey\\n",""]],"16:30":[["Louis Vervoort\\n","Ksenia Popenko ","","Erzsebet Pásztor","Lysenko Aleksey\\n",""]],"17:00":[["Louis Vervoort\\n","","","","",""]],"17:30":[["Giacomo Andreoletti","","Stanimir Panayotov ","Arto Artinian (17.40-18.40)","",""]],"18:00":[["Giacomo Andreoletti","Devin Wangert \\n","Stanimir Panayotov","Arto Artinian (17.40-18.40)","",""]],"18:30":[["","Devin Wangert\\n","","","",""]],"19:00":[["","","","","",""]],"19:30":[["","","","","",""]],"20:00":[["","","","","",""]]},"06.06-12.06":{"Monday":{"9:00-10:30":{},"10:40-12:10":{"Doors and the Constitution of Inner Space, class ID: 1":{"teacher":"Siyaves Azeri","room":"213"}},"12:30-14:00":{"Free Will in Philosophy and Neuroscience, class ID: 1":{"teacher":"Krishna- K","room":"203"},"One and Many, class ID: 2":{"teacher":"S. Panayotov","room":"211"},"Quantum Mechanics and Buddism, class ID: 3":{"teacher":"L. Vervoort","room":"213"}},"14:20-15:50":{"Evaluation of Educational Processes, class ID: 1":{"teacher":"M. Turk","room":"218/ online"},"Pschological Aspects of Decision-making, class ID: 2":{"teacher":"K. Popenko","room":"310"}},"16:00-17:30":{"Formal Logic, lecture, class ID: 1":{"teacher":"G. Andreoletti","room":"312"},"Governance of Innovations in Higher Education, class ID: 2":{"teacher":"L. Yatluk","room":"online"},"Global Art Cinema, class ID: 3":{"teacher":"P. Lesnik","room":"307"}},"17:40-19:10":{"Design Thinking, lecture, class ID: 1":{"teacher":"I. Karabanova","room":"501"}},"19:20-20:50":{"Black Atlantic, class ID: 1":{"teacher":"J. Longden","room":"online/ 501"},"The Witch Kitchen of Galapagos, class ID: 2":{"teacher":"E. Pásztor","room":"online"}},"announcement1":"","announcement2":"","divider":4},"Tuesday":{"8:30-10:00":{"Physical Education, class ID: 1":{"teacher":"","room":"Olimpiya"}},"10:15-11:45":{"Physical Education, class ID: 1":{"teacher":"","room":"Olimpiya"}},"12:30-14:00":{"Desiring Mastery: Theoretical Foundations of Anarchism, class ID: 1":{"teacher":"A. Kustov","room":"online"},"Science Communication, class ID: 2":{"teacher":"O. Dobrovidova","room":"online"},"Web-backend, class ID: 3":{"teacher":"V. Prischepa","room":"online"}},"14:20-15:50":{"Free Will in Philosophy and Neuroscience, class ID: 1":{"teacher":"Krishna- K","room":"203"},"Pschological Aspects of Decision-making, class ID: 2":{"teacher":"K. Popenko","room":"310"},"One and Many, class ID: 3":{"teacher":"S. Panayotov","room":"211"}},"16:00-17:30":{"GBL lecture, class ID: 1":{"teacher":"E. Grigorieva","room":"501"}},"17:40-19:10":{"Black Atlantic, class ID: 1":{"teacher":"J. Longden","room":"online/ 501"},"The Witch Kitchen of Galapagos, class ID: 2":{"teacher":"E. Pásztor","room":"online"}},"19:20-20:50":{"Surveillance, Drones and Robots, class ID: 1":{"teacher":"D. Wangert","room":"online"},"Quantum Mechanics and Buddism, class ID: 2":{"teacher":"L. Vervoort","room":"213"}},"announcement1":"","announcement2":"","divider":4},"Wednesday":{"09:00-10:30":{},"10:40-12:10":{"Formal Logic , lecture, class ID: 1":{"teacher":"G. Andreoletti","room":"312"}},"12:30-14:00":{"Quantum Mechanics and Buddism, class ID: 1":{"teacher":"L. Vervoort","room":"213"},"Global Art Cinema, class ID: 2":{"teacher":"P. Lesnik","room":"307"},"Quantum Mechanics and Buddism, class ID: 3":{"teacher":"L. Vervoort","room":"213"},"Tutorials — Scholars, class ID: 4":{"teacher":"E. Burbo","room":""}},"14:20-15:50":{"Great Books, lecture, class ID: 1":{"teacher":"A. Artinian","room":"online"},"Great Books: Literature, gr. 2, class ID: 2":{"teacher":"E. Grigorieva","room":"310"},"Design Thinking, gr.1, class ID: 3":{"teacher":"I. Karabanova","room":"211"}},"16:00-17:30":{"Governance of Innovations in Higher Education, class ID: 1":{"teacher":"L. Yatluk","room":"online"},"Free Will in Philosophy and Neuroscience, class ID: 2":{"teacher":"Krishna- K","room":"203"},"One and Many, class ID: 3":{"teacher":"S. Panayotov","room":"211"},"Great Books: Literature, gr. 3, class ID: 4":{"teacher":"E. Grigorieva","room":"310"}},"17:40-19:10":{"Evaluation of Educational Processes, class ID: 1":{"teacher":"M. Turk","room":"218/ online"},"Desiring Mastery: Theoretical Foundations of Anarchism, class ID: 2":{"teacher":"A. Kustov","room":"online"}},"19:20-20:50":{"Surveillance, Drones and Robots, class ID: 1":{"teacher":"D. Wangert","room":"online"},"Pschological Aspects of Decision-making, class ID: 2":{"teacher":"K. Popenko","room":"310"}},"20:00-21:30":{},"announcement1":"","announcement2":"","divider":4},"Thursday":{"9:00-10:30":{"Web-backend, class ID: 1":{"teacher":"V. Prischepa","room":"online"}},"10:40-12:10":{"Quantum Mechanics and Buddism, class ID: 1":{"teacher":"L. Vervoort","room":"213"},"Global Art Cinema, class ID: 2":{"teacher":"P. Lesnik","room":"307"}},"12:30-14:00":{"Doors and the Constitution of Inner Space, class ID: 1":{"teacher":"Siyaves Azeri","room":"213"},"From Script to Storyboard, class ID: 2":{"teacher":"N. Pokrovskaia","room":"312"}},"14:20-15:50":{"The Witch Kitchen of Galapagos, class ID: 1":{"teacher":"E. Pásztor","room":"online"}},"16:00-17:30":{"Design Thinking, gr.3, class ID: 1":{"teacher":"I. Karabanova","room":"211"},"RS, class ID: 2":{"teacher":"P. Lesnik","room":"204"},"Great Books, gr. 3, class ID: 3":{"teacher":"A. Artinian","room":"online"},"Great Books: Literature, gr. 1, class ID: 4":{"teacher":"E. Grigorieva","room":"310"}},"17:40-19:10":{"Design Thinking, gr.2, class ID: 1":{"teacher":"I. Karabanova","room":"211"},"Desiring Mastery: Theoretical Foundations of Anarchism, class ID: 2":{"teacher":"A. Kustov","room":"online"},"RS, class ID: 3":{"teacher":"A. Usvitskiy","room":"204"}},"19:20-20:50":{"Surveillance, Drones and Robots, class ID: 1":{"teacher":"D. Wangert","room":"online"}},"announcement1":"","announcement2":"","divider":4},"Friday":{"9:00-10:30":{"Formal Logic , lecture, class ID: 1":{"teacher":"G. Andreoletti","room":"312"},"Quantum Mechanics and Buddism, class ID: 2":{"teacher":"L. Vervoort","room":"213"}},"10:40-12:10":{"Great Books, gr. 2, class ID: 1":{"teacher":"S. Azeri","room":"312"},"Web-backend, class ID: 2":{"teacher":"V. Prischepa","room":"online"},"Black Atlantic, class ID: 3":{"teacher":"J. Longden","room":"online/ 501"}},"12:30-14:00":{"From Script to Storyboard, class ID: 1":{"teacher":"N. Pokrovskaia","room":"312"},"Formal Logic, gr. 2, class ID: 2":{"teacher":"G. Andreoletti","room":"211"},"Doors and the Constitution of Inner Space, class ID: 3":{"teacher":"Siyaves Azeri","room":"213"}},"14:20-15:50":{},"16:00-17:30":{"Great Books, gr. 1, class ID: 1":{"teacher":"A. Artinian","room":"online"},"Tutorials — Educators, class ID: 2":{"teacher":"S. Azeri","room":""},"GBL Oral Test, class ID: 3":{"teacher":"E. Grigoreva","room":"203"}},"17:40-19:10":{"Topic of the First Year, presentations, class ID: 1":{"teacher":"","room":"312"},"RS, class ID: 2":{"teacher":"A. Usvitskiy, P. Lesnik , A. Lysenko , E. Pásztor , S. Panayotov , J. Silverstein","room":"211 , 310 , 408 , online, 213 , online"},"GBL Oral Test, class ID: 3":{"teacher":"E. Grigoreva","room":"203"}},"19:20-20:50":{"Science Communication, class ID: 1":{"teacher":"O. Dobrovidova","room":"online"},"Topic of the First Year, presentations, class ID: 2":{"teacher":"","room":"312"},"GBL Oral Test, class ID: 3":{"teacher":"E. Grigoreva","room":"203"}},"":{},"announcement1":"","announcement2":"","divider":4},"Saturday":{"8:30-10:00":{"Physical Education, class ID: 1":{"teacher":"","room":"Olimpiya"}},"10:15-11:45":{"Physical Education, class ID: 1":{"teacher":"","room":"Olimpiya"}},"10:40-12:10":{"Topic of the First Year, presentations, class ID: 1":{"teacher":"","room":"501"}},"12:30-14:00":{"From Script to Storyboard, class ID: 1":{"teacher":"N. Pokrovskaia","room":"312"},"Quantum Mechanics and Buddism, class ID: 2":{"teacher":"L. Vervoort","room":"213"},"Professional Seminar Y1, class ID: 3":{"teacher":"D. Melnyk","room":"218/ online"},"GBL Oral Test, class ID: 4":{"teacher":"E. Grigoreva","room":"203"}},"14:20-15:50":{"Topic of the First Year, presentations, class ID: 1":{"teacher":"","room":"312"},"Free Will in Philosophy and Neuroscience, class ID: 2":{"teacher":"Krishna- K","room":"203"},"GBL Oral Test, class ID: 3":{"teacher":"E. Grigoreva","room":"203"}},"16:00-17:30":{"Topic of the First Year, presentations, class ID: 1":{"teacher":"","room":"312"},"RS, class ID: 2":{"teacher":"S. Panaiotov","room":"218"}},"17:40-19:10":{"Topic of the First Year, presentations, class ID: 1":{"teacher":"","room":"312"},"RS, class ID: 2":{"teacher":"S. Panaiotov","room":"218"}},"19:20-20:50":{"Topic of the First Year, presentations, class ID: 1":{"teacher":"","room":"312"}},"announcement1":"","announcement2":"","divider":4}}}'
)

  app.get('/schedule_data', function (req, res) {
    res.send(JSON.stringify(data_manual));
    // Schedule.find().exec(function (err, data) {
    //   if (err) { res.send(err); console.log(err); } else {
    //     res.setHeader('Access-Control-Allow-Origin', '*');
    //     res.setHeader('Access-Control-Allow-Methods', 'GET');
    //     res.send(JSON.stringify(data[0].schedule));
    //   }
    // });
  });
};
