var mongoose = require('mongoose');

const Workout = new mongoose.Schema({
    id: {type: String, unique:true, required:true, index:true},
    exercise: {type: String, required:true},
    workout: {type: Array},
    date: {type:String, required:true},
    username: {type: String, required:true}
});

mongoose.model('Workout', Workout);

module.exports = Workout;