var mongoose = require('mongoose');
var Workout = mongoose.model('Workout');
var util = require('../util/random.js')();

module.exports = function () {
    global.app.post('/workout/add', global.authenticate, function (req, res) {
        var workout = new Workout();
        workout.id = util.generateId();
        workout.exercise = req.body.exercise;
        workout.workout = req.body.workout;
        workout.date = req.body.date;
        workout.username = req.body.username;
        workout.save(function(err) {
            if (err) {
                res.status(500).json(err);
            }else {
                res.status(200);
                res.json({
                    "message" : "Data saved successfully",
                });
            }
        });
    });

    global.app.put('/workout/update', global.authenticate, function (req, res) {
        var _id = req.body._id;
        var workout = {};
        workout.exercise = req.body.exercise;
        workout.workout = req.body.workout;
        Workout.findByIdAndUpdate(_id, workout, {new: true}, function(err) {
            if (err) {
                res.status(500).json(err);
            }else {
                res.status(200);
                res.json({
                    "message" : "Workout updated successfully",
                });
            }
        });
    });

    global.app.delete('/workout/delete/:_id', global.authenticate, function (req, res) {
        var _id = req.params._id;
        Workout.findByIdAndRemove(_id, function(err) {
            if (err) {
                res.status(500).json(err);
            }else {
                res.status(200);
                res.json({
                    "message" : "Workout deleted successfully",
                });
            }
        });
    });

    global.app.get('/workout/get/:username', global.authenticate, function (req, res) {
        Workout.find({username: req.params.username}, null, {sort: {date: -1}}, function(err, exercises) {
            if (err) {
                res.status(500).json(err);
            }else {
                res.status(200);
                res.json({
                    "message" : "Data fetched successfully",
                    "data": exercises
                });
            }
        });
    });

    global.app.post('/workout/get/:username', function (req, res) {
        var username = req.params.username;
        var range1 = req.body.range1;
        var range2 = req.body.range2;
        Workout.find({username: username, date: {$gt:range1, $lte:range2}}, null, {sort: {date: -1}}, function(err, exercises) {
            if (err) {
                res.status(500).json(err);
            }else {
                res.status(200);
                res.json({
                    "message" : "Data fetched successfully",
                    "data": exercises
                });
            }
        });
    });
};