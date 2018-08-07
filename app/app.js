var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
// Require newly added route
var getImagesRouter = require('./routes/getImages');
var postImageRouter = require('./routes/postImage');
var putImageRouter = require('./routes/putImage');
var deleteImageRouter = require('./routes/deleteImage');

var app = express();

// IMPORTANT - database connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/masterclass');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:')); // Log possible connection errors to the database
db.once('open', function() {
    // You can write code directly inside this block but it is best practice to keep your API calls in separated modules
});

// View engine setup (we won't be using that part as REACT renders our views)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Default settings from express generator
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// Set up the path to our route : we use this path with the "fetch" method in the React app to call the query
app.use('/getImages', getImagesRouter);
app.use('/postImage', postImageRouter);
app.use('/putImage', putImageRouter);
app.use('/deleteImage', deleteImageRouter);



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