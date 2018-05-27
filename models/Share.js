var mongoose = require('mongoose');

const Share = new mongoose.Schema({
    id: {type: String, unique:true, required:true, index:true},
    username: {type: String, required:true},
    name: {type: String},
    date: {type:Date},
});

mongoose.model('Share', Share);

module.exports = Share;