module.exports = function(app){
  app.get('/sas-schedule', function(req, res) {
    res.render('sas-schedule');
});
}
