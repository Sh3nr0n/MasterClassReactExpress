var express = require('express');
var router = express.Router();
var Image = require('../schema/schemaImage');

router.post('/', function(req, res, next) {
    console.log('postImage.js : Got a Post request')

    // Create an instance of the schemaImage model

    var image = new Image({
        imageSrc: req.body.imageSrc,
        description: req.body.desc
      })
      console.log('imageSrc is %s and description is %s', req.body.imageSrc,req.body.desc )
      image.save(function (err, postedResult) {
        if (err) { return next(err) }
      })
    res.send();
})

module.exports = router;