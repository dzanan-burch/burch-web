var mongoose = require('mongoose');
var Exercise = mongoose.model('Exercise');
var util = require('../util/random.js')();
module.exports = function () {
    global.app.post('/exercise/add', global.authenticate, function (req, res) {
        var name = req.body.name;
        var muscle = req.body.muscle;
        var username = req.body.username;
        var exercise = new Exercise();
        exercise.id = util.generateId();
        exercise.name = name;
        exercise.muscle = muscle;
        exercise.username = username;
        exercise.save(function(err) {
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

    global.app.get('/exercise/get', global.authenticate, function (req, res) {
        Exercise.find({}, function(err, exercises) {
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

    global.app.get('/exercise/get/:username', global.authenticate, function (req, res) {
        var username = req.params.username;
        Exercise.find({username: username}, function(err, exercise) {
            if (err) {
                res.status(500).json(err);
            }else {
                res.status(200);
                res.json({
                    "message" : "Data fetched successfully",
                    "data": exercise
                });
            }
        });
    });

    global.app.delete('/exercise/delete/:_id', global.authenticate, function (req, res) {
        var _id = req.params._id;
        Exercise.findByIdAndRemove(_id, function(err, exercise) {
            if (err) {
                res.status(500).json(err);
            }else {
                res.status(200);
                res.json({
                    "message" : "Exercise deleted successfully",
                });
            }
        });
    });

    global.app.put('/exercise/update', global.authenticate, function (req, res) {
        var data = {};
        var _id = req.body._id;
        data.name = req.body.name;
        data.muscle = req.body.muscle;
        Exercise.findByIdAndUpdate(_id, data, {new: true}, function(err, exercise) {
            if (err) {
                res.status(500).json(err);
            }else {
                res.status(200);
                res.json({
                    message : "Exercise deleted successfully",
                    data: exercise
                });
            }
        });
    });
};