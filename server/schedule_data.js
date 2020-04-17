module.exports = function(app, Schedule, logger){

app.post('/schedule_data_0382473723', function(req, res) {
  console.log(req.body);
  Schedule.findOne({}, function(err, entry) {
  if (err)
    return done(err);
  entry.schedule = req.body;
  entry.save(function(err) {
    if (err)
      return console.error(err);
    return;
  });
});
  res.send('done')
});

  app.get('/schedule_data', function(req, res) {
    Schedule.findOne({}, function(err, entry) {
      if (err)
        return done(err);
      res.send(entry.schedule)
      });
  });

}
