var express = require('express');
var router = express.Router(); // The router.METHOD() methods provide the routing functionality in Express, where METHOD is one of the HTTP methods, such as GET, PUT, POST, and so on, in lowercase. Thus, the actual methods are router.get(), router.post(), router.put(), and so on.
var Image = require('../schema/schemaImage')

// Express translates the path strings to regular expressions, used internally to match incoming requests. Query strings are not considered when performing these matches, for example “GET /” would match the following route, as would “GET /?name=tobi”.

router.get('/', async function(req, res, next) { // Use of Async function to handle the promise from the Image.find() query
  console.log('getImage.js : Got a Get request')
  Image.find({}, function(err, images) {   // Search for all objects in db and return an images object as specified in the Image schema

    if (err) { return next(err) }
    console.log('image list : ', images);
    return res.json(images);
  });
});

// // Test without db connection
// router.get('/', function(req, res, next) {
//   const images = [
//     {id: 1, imageSrc: 'https://picsum.photos/400?image=1069', description: '1st image'},
//     {id: 2, imageSrc: 'https://picsum.photos/400?image=1079', description: '2nd image'},
//     {id: 3, imageSrc: 'https://picsum.photos/400?image=1060', description: '3rd image'},
//   ]

// res.send(images)
// });

module.exports = router;