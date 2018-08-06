var mongoose = require('mongoose');

var Schema = mongoose.Schema

var ImageSchema = new Schema({
    imageSrc: String,
    description: String
    },{
    collection:'Image'//Collection name in which to insert the data (if not specified mongoDB automatically creates a document to store the data)
    }
);

var Image = mongoose.model('Image', ImageSchema);

module.exports = Image;