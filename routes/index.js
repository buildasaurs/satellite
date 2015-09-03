/**
 * Created by honzadvorsky on 03/09/15.
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'satellite' });
});

module.exports = router;
