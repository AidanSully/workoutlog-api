const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateExercise(data) {
    let errors = {}
    let validExercises = ['push-ups', 'pull-ups', 'dips', 'squats', 'rows', 'pike push-ups']
    // Convert empty fields to and empty string
    // so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name : "";
    data.variation = !isEmpty(data.variation) ? data.variation : "regular";
    data.reps = data.reps > 0 ? data.reps : 0;
    data.sets = data.sets > 0 ? data.sets : 0;

    let found = false;
    // Name check
    for (let i = 0; i < validExercises.length; i++) {
        if (validExercises[i] === data.name) {
            found = true;
            break ;
        }
    }
    if (!found) {
        errors.name = "Exercise name is invalid";
    }

    // Reps check
    if (data.reps < 1) {
        errors.reps = "Reps are required";
    }

    // Sets check
    if (data.sets < 1) {
        errors.sets = "Sets are required";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
};