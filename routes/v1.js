/**
 * Created by honzadvorsky on 03/09/15.
 */

var express = require('express');
var router = express.Router();

var badge = require('./badge');

router.use('/badge', badge);

module.exports = router;
