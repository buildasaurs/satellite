/**
 * Created by honzadvorsky on 03/09/15.
 */

var redis = require('redis');
var url = require('url');
var _client = null;

module.exports = function() {
	if (!_client) {
		var redisURL = url.parse(process.env.REDIS_URL);
		var client = redis.createClient(redisURL.port, redisURL.hostname);
		client.auth(redisURL.auth.split(":")[1]);
		_client = client;
	}
	return _client;
};
