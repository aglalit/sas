module.exports = function(app, Schedule, logger){

app.post('/schedule_data_0382473723', function(req, res) {
  Schedule.findOne({}, function(err, data) {
    if (err) { res.send(err); console.log(err); }
    else {
      data.schedule = JSON.stringify(req.body);
      data.save(function(err) {
        if (err)
          return console.error(err);
        return;
      });
      res.send('200');
    }
  });

});

  app.get('/schedule_data', function(req, res) {

    Schedule.find().exec(function(err, data) {
      if (err) { res.send(err); console.log(err); }
      else {
        res.setHeader('Access-Control-Allow-Origin', 'https://sas.utmn.ru');
        res.send(JSON.stringify(data[0].schedule))
      }
      });
  });

}
