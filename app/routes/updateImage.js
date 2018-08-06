var express = require('express');
var router = express.Router();
var Image = require('../schema/schemaImage');

router.post('/', function(req, res, next) {
    console.log('putImage.js : Got a post request for image id:',req.body.id)
    Image.findOneAndUpdate(
      {
        _id: req.body.id //search query
      },
      {
        imageSrc: req.body.imageSrc,
        description: req.body.desc // fields:values to update
      },
    )
    .then(doc => console.log('Request parameters are %s and %s', req.body.imageSrc,req.body.desc ))
    .catch(err => {console.error(err)})
    
    res.send();
})

module.exports = router;