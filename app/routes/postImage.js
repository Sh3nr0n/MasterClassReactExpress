var express = require('express');
var router = express.Router();

var Image = require('../schema/schemaImage');
// var mongoose = require('mongoose');
// var db = mongoose.connection;


router.post('/', function(req, res, next) {
    console.log('postImage.js : Got a post request')

    var image = new Image({
        imageSrc: req.body.imageSrc,
        description: req.body.desc
      })
      console.log('request parameters are %s and %s', req.body.imageSrc,req.body.desc )
      image.save(function (err, postedResult) {
        if (err) { return next(err) }
      })

    // var collection = db.collection('Image')
    // collection.insert({
    // imageSrc: req.body.imageSrc,
    // description: req.body.desc
    // }, function(err, result) {
    //     if (err) { console.log(err);}
    // })
     
    res.send();
})




module.exports = router;