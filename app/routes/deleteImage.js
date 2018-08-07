var express = require('express');
var router = express.Router();
var Image = require('../schema/schemaImage');

router.delete('/', function(req, res, next) {
    console.log('deleteImage.js : Got a Delete request for image id:',req.body.id)
    Image.deleteOne({
        _id: req.body.id //search query
    })
    .then(response => console.log('Document was removed successfully :',response))
    .catch(err => {console.error(err)})
})

module.exports = router;