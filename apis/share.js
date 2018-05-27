var mongoose = require('mongoose');
var Share = mongoose.model('Share');
var util = require('../util/random.js')();

module.exports = function () {
    global.app.post('/workout/share', function (req, res) {
        var share = new Share();
        share.id = util.generateId();
        share.date = req.body.date;
        share.username = req.body.username;
        share.name = req.body.name;
        share.save(function(err, data) {
            if (err) {
                res.status(500).json(err);
            }else {
                res.status(200);
                res.json({
                    "message" : "Data saved successfully",
                    "id": data._doc.id
                });
            }
        });
    });

    global.app.get('/workout/share/:id', function (req, res) {
        var id = req.params.id;
        Share.find({id: id}, function(err, workout) {
            if (err) {
                res.status(500).json(err);
            }else {
                res.status(200);
                res.json({
                    "message" : "Data fetched successfully",
                    "data": workout
                });
            }
        });
    });
};