const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create schema
const exerciseSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	variation: {
		type: String,
		required: true
	},
	reps: {
		type: Number,
		required: true
    },
    sets: {
        type: Number,
        required: true
    }
});

const Exercises = mongoose.model('Exercises', exerciseSchema);

module.exports = Exercises;