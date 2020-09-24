const express = require('express');
const router = express.Router();

// Load model and input validation
let Exercise = require('../models/exercise.model');
const { response } = require('express');
const validateExercise = require('../validation/exercise.validation');

// @route POST api/exercises/add
// @desc add exercise to table
// @access Public
router.post("/exercises/add", (req, res) => {
    // Form validation
    const { errors, isValid } = validateExercise(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    else {
        const newExercise = new Exercise({
            name: req.body.name,
            variation: req.body.variation,
            reps: req.body.reps,
            sets: req.body.sets
        });
        newExercise.save((err) => {
            if (err) {
                console.log(err);
            }
            else {
                res.json(newExercise);
            }
        })
    }
});

module.exports = router;