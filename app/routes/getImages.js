var express = require('express');
var router = express.Router();

var Image = require('../schema/schemaImage')

//  GET images listing

// Use of Async function to handle the promise from the Image.find() query

router.get('/', async function(req, res, next) {
  // Search for all objects in db and return an images object as specified in the Image schema
  Image.find({}, function(err, images) {
    if (err) { return next(err) }
    console.log(images);
    return res.json(images);
  });
});

// // Test without db connection
// router.get('/', function(req, res, next) {
//   const images = [
//     {id: 1, imageSrc: 'dsqdsqd', description: 'guy'},
//     {id: 2, imageSrc: 'dsqdqsdqs', description: 'guy'},
//     {id: 3, imageSrc: 'fdgdg', description: 'guy'},
//   ]

// res.send(images)
// });

module.exports = router;