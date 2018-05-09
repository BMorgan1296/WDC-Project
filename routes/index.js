var express = require('express');
var router = express.Router();

//Hi Marker!
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
