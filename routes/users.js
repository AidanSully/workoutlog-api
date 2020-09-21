const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Load input validation
const validateRegisterInput = require("../validation/register.validation");
const validateLoginInput = require("../validation/login.validation");
let User = require('../models/user.model');
const { response } = require('express');

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
	// Form validation
	const { errors, isValid } = validateRegisterInput(req.body);
	// Check validation
	if (!isValid) {
	  	return res.status(400).json(errors);
	}
	User.findOne({ email: req.body.email }).then(user => {
	  	if (user) {
			return res.status(400).json({ email: "Email already exists" });
		} 
		else {
			const newUser = new User({
		  		name: req.body.name,
		  		email: req.body.email,
		  		password: req.body.password
			});
		// Hash password before saving in database
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(newUser.password, salt, (err, hash) => {
				if (err) throw err;
				newUser.password = hash;
				newUser
			  		.save()
			  		.then(user => res.json(user))
			  		.catch(err => console.log(err));
				});
			});
		}
	});
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
	// Form validation
	const { errors, isValid } = validateLoginInput(req.body);
	
	// Check validation
	if (!isValid) {
	  	return res.status(400).json(errors);
	}
	const email = req.body.email;
	const password = req.body.password;

	// Find user by email
	User.findOne({ email }).then(user => {
		// Check if user exists
		if (!user) {
			return res.status(400).json({ emailnotfound: "Email not found" });
		}
		// TODO: Check password with bcrypt
		bcrypt.compare(password, user.password).then((res) => {
			if (res) {
				return console.log("passwords match");
			} else {
				return console.log("passwords do not match");
			}
		})
		// else {
		// 	return res.status(400).json({ emailfound: "Email is present" });
		// }
	});
});

module.exports = router;