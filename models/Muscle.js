var mongoose = require('mongoose');

const Muscle = new mongoose.Schema({
    id: { type: String, unique:true, required:true, index:true },
    name: { type: String, required:true, index:true },
    description: { type: String },
});
mongoose.model('Muscle', Muscle);

module.exports = Muscle;