var mongoose = require('mongoose');
var Muscle= mongoose.model('Muscle');
var util = require('../util/random.js')();

module.exports = function () {
    global.app.post('/muscle/add', global.authenticate, function (req, res) {
        var muscle = new Muscle();
        muscle.id = util.generateId();
        muscle.name = req.body.name;
        muscle.description = req.body.description;
        muscle.save(function(err) {
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

    global.app.put('/muscle/update', global.authenticate, function (req, res) {
        var _id = req.body._id;
        var muscle = {};
        muscle.name = req.body.name;
        muscle.description = req.body.description;
        Muscle.findByIdAndUpdate(_id, muscle, {new: true}, function(err) {
            if (err) {
                res.status(500).json(err);
            }else {
                res.status(200);
                res.json({
                    "message" : "Data updated successfully",
                });
            }
        });
    });

    global.app.delete('/muscle/delete/:_id', global.authenticate, function (req, res) {
        var _id = req.params._id;
        Muscle.findByIdAndRemove(_id, function(err) {
            if (err) {
                res.status(500).json(err);
            }else {
                res.status(200);
                res.json({
                    "message" : "Muscle deleted successfully",
                });
            }
        });
    });

    global.app.get('/muscle/get', global.authenticate, function (req, res) {
        Muscle.find({}, function(err, muscles) {
            if (err) {
                res.status(500).json(err);
            }else {
                res.status(200);
                res.json({
                    "message" : "Data fetched successfully",
                    "data": muscles
                });
            }
        });
    });

    global.app.get('/muscle/get/:id', global.authenticate, function (req, res) {
        var id = req.query.id;
        Muscle.findById({id: id}, function(err, muscle) {
            if (err) {
                res.status(500).json(err);
            }else {
                res.status(200);
                res.json({
                    "message" : "Data fetched successfully",
                    "data": muscle
                });
            }
        });
    });
};