module.exports = function(app, Session, transporter){

app.get('/polls/vue_test', function(req, res) {
  res.render('vue_test')
});

app.post('/polls/vue_test', function(req, res) {
  res.render('vue_test')
});

}
