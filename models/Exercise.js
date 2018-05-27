var mongoose = require('mongoose');

const Exercise = new mongoose.Schema({
    id: {type: String, unique:true, required:true, index:true},
    name: {type: String, required:true, index:true},
    muscle: {type: String, required:true},
    username: {type: String, required:true},
});

mongoose.model('Exercise', Exercise);

module.exports = Exercise;