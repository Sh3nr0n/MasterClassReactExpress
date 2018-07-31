var express = require('express');
var router = express.Router();

var Image = require('../schema/schemaImage')

// /* GET users listing. */

router.get('/', async function(req, res, next) {
  Image.find({}, function(err, images) {
    if (err) { return res.status(509).json({ error: err }); }
    if (!images) { return res.status(504).json({ images: 'none' }); }
    console.log(images);
    return res.json(images);
  });
});

// // test without db connection
// router.get('/', function(req, res, next) {
//   const images = [
//     {id: 1, imageId: 'dsqdsqd', description: 'guy'},
//     {id: 2, imageId: 'dsqdqsdqs', description: 'guy'},
//     {id: 3, imageId: 'fdgdg', description: 'guy'},
//   ]

// res.send(images)
// });

module.exports = router;