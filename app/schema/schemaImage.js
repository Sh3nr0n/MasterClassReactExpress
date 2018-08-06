var mongoose = require('mongoose');
var Schema = mongoose.Schema

// Define a schema e.g. the shape of the document within a mongoDB collection
// http://mongoosejs.com/docs/guide.html

var ImageSchema = new Schema({
    imageSrc: String, // Input data types
    description: String
    },{
    collection:'Image'//Collection name in which to insert the data (if not specified mongoDB automatically creates a document to store the data)
    }
);

// To use our schema definition, we need to convert our "ImageSchema" into a Model we can work with :

var Image = mongoose.model('Image', ImageSchema);

module.exports = Image;