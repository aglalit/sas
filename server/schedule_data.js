module.exports = function(app, Schedule, logger){

app.post('/schedule_data_0382473723', function(req, res) {
  Schedule.find({_id: 1}}, function(err, entry) {
  if (err)
    return done(err);
  entry.schedule = req.body;
  entry.save(function(err) {
    if (err)
      return console.error(err);
    return;
  });
});
});

  app.get('/schedule_data', function(req, res) {
    var query = {};

    if (req.query.s === 'ba_2019_electives'){
      Schedule.find({
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

}
