/**
 * Created by honzadvorsky on 10/14/15.
 */

var express = require('express');
var router = express.Router();

router.get('/:hostname/:botId/:integrationId', function(req, res, next) {
    var params = req.params;
    var hostname = params.hostname;
    var botId = params.botId;
    var integrationId = params.integrationId;

    if (!hostname) { res.status(400).send("No hostname provided"); return }
    if (!botId) { res.status(400).send("No botId provided"); return }
    if (!integrationId) { res.status(400).send("No integrationId provided"); return }

    var link = getDeepLinkUrlFor(hostname, botId, integrationId);
    res.status(301).header('Location', link).send('Redirecting to ' + link);
});

function getDeepLinkUrlFor(hostname, botId, integrationId) {
    var link = "xcbot://" + hostname + "/botID/" + botId + "/integrationID/" + integrationId;
    return link;
}


module.exports = router;

