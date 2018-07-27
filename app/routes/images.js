var express = require('express');
var router = express.Router();

var path = require('path');

var Image = require('../schema/schemaImage');

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../client/public/index.html'))
});

module.exports = router;