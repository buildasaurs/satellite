/**
 * Created by honzadvorsky on 03/09/15.
 */

var express = require('express');
var router = express.Router();
var https = require('https');
var db = require('./redis');

//TODO: branch?
router.get('/:user/:repo/:branch?', function(req, res, next) {
    var params = req.params;
    var user = params.user;
    var repo = params.repo;
    var branch = params.branch || "master";
    getStatus(user, repo, branch, function(err, status) {

        console.log();
    });
});

function getStatus(user, repo, branch, completion) {

    fetchBadgeUrl(user, repo, branch, function(err, status) {
        console.log();
    });
}

function fetchBadgeUrl(user, repo, branch, completion) {

    var path = "/repos/" + user + "/" + repo + "/commits/" + branch + "/status";
    var options = {
        hostname: 'api.github.com',
        port: 443,
        path: path,
        method: 'GET',
        headers: {
            'User-Agent': 'satellite'
        }
    };

    https.get(options, function(response) {

        var data = '';
        response.on('error', function(err) {
            console.error(err);
        completion(err, null);

        }).on('data', function(d) {

            data += d;
        }).on('end', function() {

            //find the rate limit
            rateLimit(response.headers);

            //we have data
            var parsed = JSON.parse(data);
            var state = parsed['state'];
            var url = urlFromState(state);
            completion(null, url);
        });
    });
}

function rateLimit(headers) {
    var remaining = headers['x-ratelimit-remaining'];
    var limit = headers['x-ratelimit-limit'];
    var reset = headers['x-ratelimit-reset'] * 1000; //seconds -> millis
    var now = Date.now(); //millis
    var timeRemaining = (reset - now) / 1000; //back to seconds
    var minutesRemaining = Math.floor(timeRemaining / 60);
    console.log("Rate limit: [remaining: " + remaining + ", limit: " + limit + ", resets in " + minutesRemaining + " minutes]");
}

function urlFromState(state) {

    var imgPath = 'https://img.shields.io/badge/';
    if (state === 'success') {
        imgPath = imgPath + 'build-passing-green.svg';
    } else if (state === 'failure') {
        imgPath = imgPath + 'build-failing-red.svg';
    } else {
        imgPath = imgPath + 'build-unknown-gray.svg';
    }
    return imgPath;
}

function fetchFromRedis(user, repo, branch, completion) {

    var key = ["badges", user, repo, branch].join(":");
    db().get(key, function(err, reply) {
        
    });
}

module.exports = router;


//function getStatus(req, res, next) {
//
//    //see if we have it in Redis already, with TTL of 90 seconds
//    let db = P.DB.shared();
//    db.getBuildasaurStatusBadgeUrl((err, badgeUrl) => {
//
//        if (badgeUrl) {
//        //had it in cache, just return
//        replyWithBadgeUrl(badgeUrl, res);
//    } else {
//
//        //we must refetch
//        refetchBadgeUrl((err, badgeUrl) => {
//            if (err) {
//            replyWithBadgeUrl(null, res);
//        } else {
//            //cache now that we have it again
//            db.setBuildasaurStatusBadgeUrl(badgeUrl, 90, (err) => {
//                if (err) {
//                replyWithBadgeUrl(null, res);
//            } else {
//                replyWithBadgeUrl(badgeUrl, res);
//            }
//        })
//    }
//})
//}
//});
//}