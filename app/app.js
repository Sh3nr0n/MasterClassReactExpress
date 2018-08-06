var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
// Require newly added route
var getImagesRouter = require('./routes/getImages');
var postImageRouter = require('./routes/postImage');
var updateImageRouter = require('./routes/updateImage');


// This body-parser module parses the JSON, buffer, string and URL encoded data submitted using HTTP POST request. 
var bodyParser = require('body-parser')
// var urlencodedParser = bodyParser.urlencoded({
//     extended: true
// });

var app = express();

// IMPORTANT - Connection BDD
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/masterclass');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
// Same usage as bodyParser.urlencoded()?
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// Set up the path to our route : we use this path with the "fetch" method in the React app to call the query
app.use('/getImages', getImagesRouter);
app.use('/postImage', postImageRouter);
app.use('/updateImage', updateImageRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;