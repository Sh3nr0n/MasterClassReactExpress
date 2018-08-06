var express = require('express');
var router = express.Router();
var Image = require('../schema/schemaImage');

router.post('/', function(req, res, next) {
    console.log('deleteImage.js : Got a delete request for image id:',req.body.id)
    Image.deleteOne({
        _id: req.body.id //search query
    })
    .then(response => console.log('Document was removed successfully :',response))
    .catch(err => {console.error(err)})
})

module.exports = router;