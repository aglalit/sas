var express = require('express');
var router = express.Router();

router.get('/2nd-module-electives-1', function(req, res) {
    res.render('polls/2nd-module-electives-1');
});

module.exports = router;
