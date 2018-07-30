var express = require('express');
var router = express.Router();

// /* GET users listing. */
router.get('/', function(req, res, next) {
  const images = [
    {id: 1, imageId: 'dsqdsqd', description: 'guy'},
    {id: 2, imageId: 'dsqdqsdqs', description: 'guy'},
    {id: 3, imageId: 'fdgdg', description: 'guy'},
  ]
  res.send(images);
});

module.exports = router;