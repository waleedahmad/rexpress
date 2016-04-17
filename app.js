var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var expressSession = require('express-session');
var flash = require('connect-flash');
var initPassport = require('./passport/init');

// App config
var config = require('./config.js');

// DB Connection
mongoose.connect(config.db.config.url);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(flash());

// Static Resources
app.use(express.static(path.join(__dirname, 'public')));

// Views Config
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));

// Passport Config
app.use(expressSession({
    secret: config.app.secret,
    resave : true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


// Routes
initPassport(passport);
var routes = require('./routes.js')(passport);
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


app.listen(config.app.port, function(){
    console.log("Listening on Port "+ config.app.port);
});