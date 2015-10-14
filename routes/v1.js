/**
 * Created by honzadvorsky on 03/09/15.
 */

var express = require('express');
var router = express.Router();

var badge = require('./badge');
var xcs_deeplink = require('./xcs_deeplink');

router.use('/badge', badge);
router.use('/xcs_deeplink', xcs_deeplink);

module.exports = router;
