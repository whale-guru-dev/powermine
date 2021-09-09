var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const rateLimit = require("express-rate-limit");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var iostRouter = require('./routes/iost');
//var imatchRouter = require('./routes/imatch');
//var igooseRouter = require('./routes/igoose');
var adminRouter = require('./routes/admin');
//var richListRouter = require('./routes/richList');
var iChipRouter = require('./routes/ichips');
//var epicRouter = require('./routes/epic');
//var vdcRouter = require('./routes/vdc');
//var thechosenoneRouter = require('./routes/thechosenone');

//var vdcRichlist = require('./vdc/api');
//var richList = require('./richlist/richlist');

var app = express();

app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)

const apiLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 500   //10K request per minute only per IP.
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

//  apply to all requests
app.use("/", apiLimiter);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/iost', iostRouter);
app.use('/admin', adminRouter);
//app.use('/imatch', imatchRouter);
// app.use('/igoose', igooseRouter);
//app.use('/richList', richListRouter);
app.use('/hodl', iChipRouter);
//app.use('/epic', epicRouter);
//app.use('/vdc', vdcRouter);
//app.use('/thechosenone', thechosenoneRouter);

app.get('*', function (req, res) {
    res.render('404');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/powermine';
mongoose.connect(mongoDB, {useNewUrlParser: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

setInterval(
    function () {
        richList.grab_per_iost_richlist();
        vdcRichlist.grab_vdc_richlist();
    }, 10000);

module.exports = app;
