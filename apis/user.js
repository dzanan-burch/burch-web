var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function () {
    global.app.post('/user/login', function (req, res) {
        passport.authenticate('local', function(err, user, info){
            var token;
            // If Passport throws/catches an error
            if (err) {
                res.status(404).json(err);
                return;
            }
            // If a user is found
            if(user){
                token = user.generateJwt();
                res.status(200);
                res.json({
                    "token" : token,
                    "username": user._doc.username,
                    "name": user._doc.name
                });
            } else {
                // If user is not found
                res.status(401).json(info);
            }
        })(req, res);
    });

    global.app.post('/user/register', function (req, res) {
        var user = new User();
        user.username = req.body.username;
        user.name = req.body.name;
        user.password = req.body.password;
        //user.setPassword(req.body.password);
        if (!user.username) {
            res.status(500);
            res.json({message: 'username is missing'});
        }

        if (!user.name) {
            res.status(500);
            res.json({message: 'name is missing'});
        }

        if (!user.password) {
            res.status(500);
            res.json({message: 'password is missing'});
        }
        User.findOne({username: user.username}).exec(function(err, result) {
            if (result && result._doc) {
                res.status(500);
                res.json({message: 'Username already exists. Use a different username'});
            }else {
                user.save(function(err) {
                    if (err) {
                        res.status(500);
                        res.json(err);
                    }else {
                        var token;
                        token = user.generateJwt();
                        res.status(200);
                        res.json({
                            "token" : token
                        });
                    }
                });
            }
        });
    });

    global.app.post('/user/profile/update', global.authenticate, function (req, res) {
        var id = req.body.username;
        var name = req.body.name;
        var dob = req.body.dob;
        var gender = req.body.gender;
        //user.setPassword(req.body.password);
        User.findOneAndUpdate( {"username": id}, {name: name, dob: dob, gender: gender}, function(err) {
            if (err) {
                res.status(500);
                res.json(err);
            }else {
                res.status(200);
                res.json({
                    "message" : "Profile updated successfully"
                });
            }
        });
    });

    global.app.get('/user/profile/:username', global.authenticate, function (req, res) {
        if (!req.params.username) {
            res.status(401).json({
                "message" : "UnauthorizedError: private profile"
            });
        } else {
            User.findOne({username: req.params.username})
                .exec(function(err, user) {
                    if (user && user._doc) {
                        delete user._doc.password;
                    }
                    res.status(200).json(user);
                });
        }
    });
};