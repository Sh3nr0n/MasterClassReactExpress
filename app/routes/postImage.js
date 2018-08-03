var express = require('express');
var router = express.Router();

var Image = require('../schema/schemaImage');


router.post('/', function(req, res, next) {
    var image = new Image({
        imageId: req.body.imageId,
        description: req.body.imageId
      })
      image.save(function (err, postedResult) {
        if (err) { return next(err) }
      })

//     var collection = db.collection('Image')
// collection.insert({
//     imageId: 'fgiherkdvkerhvoerhj123545',
//     description: 'Bouuuuuuuuuu !',
// }, function(err, result) {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result)
// })
     
    res.send();
})




module.exports = router;