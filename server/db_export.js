module.exports = function(app, Session, User) {

  app.get('/db-export', function(req, res) {
    // User.find({}, function(err, users) {
    //   var jsonOutput=JSON.stringify(users);
    //         var filename = 'users.json'
    //         var mimetype = 'application/json'
    //
    //         res.setHeader('Content-disposition', 'attachment; filename=' + filename)
    //         res.setHeader('Content-type', mimetype)
    //         res.end(jsonOutput)
    // });
      Session.find({}, function(err, sessions) {
        var jsonOutput=JSON.stringify(sessions);
              var filename = 'sessions.json'
              var mimetype = 'application/json'

              res.setHeader('Content-disposition', 'attachment; filename=' + filename)
              res.setHeader('Content-type', mimetype)
              res.end(jsonOutput)
      });
    });
}
