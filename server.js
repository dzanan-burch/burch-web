var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config/config.js');

global.app = express();
global.app.use(cors());
global.app.use(bodyParser.json());
global.app.use(bodyParser.urlencoded({ extended: true }));
global.app.use('/',express.static(__dirname + "/public/"));
global.app.use(passport.initialize());
global.app.set('port', process.env.PORT || 7777);

const expressJwt = require('express-jwt');  
global.authenticate = expressJwt({secret : 'finesstracker'});

global.app.use(passport.initialize());
global.app.use(passport.session());

function _loadAPIs() {
    require("./apis/user.js")();
    require("./apis/exercise.js")();
    require("./apis/muscle.js")();
    require("./apis/workout.js")();
    require("./apis/share.js")();
}

function _loadModels() {
    require("./models/User.js");
    require("./models/Exercise.js");
    require("./models/Muscle.js");
    require("./models/Workout.js");
    require("./models/Share.js");
}

function _connectDB() {
    mongoose.connect(config.database); // connect to database
    app.set('superSecret', config.secret);
}

var server = app.listen(app.get('port'), function(){
    _loadModels();
    console.log("Models loaded");
    _loadAPIs();
    console.log("APIs loaded");
    _connectDB();
    console.log("Database Connected");
    require('./config/passport');
    console.log("Server started and listing at port number " + app.get('port'));
});