var express = require('express');
var router = express.Router();

var User = require('../models/Users');
var loggedInUser = '';
var config = require('../config');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

// login user
router.route('/userLogin').post(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	
	User.findOne({username: req.body.username}
	, function (err, user) {
		// login success
        if (user && user.length !== 0) {
			// hash password compare
			var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
			if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
			
			loggedInUser = req.body.username;
			var token = jwt.sign({ id: user._id }, config.secret, {
				expiresIn: 86400 // expires in 24 hours
			});
			res.status(200).json({message: 'User Logged in', status: 'ok', data: user, token: token});
        } else {
			// not found
			res.status(400).json({message: 'Login fail', status: 'error'});
        }
		if (err) {
			// not found
			res.status(400).json({message: 'Login fail', status: 'error'});
		}
    });
});

// register new user	
router.route('/userRegister').post(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	var hashedPassword = bcrypt.hashSync(req.body.password, 8);
	req.body.password = hashedPassword;
	var user = new User(req.body);
	user.save().then(item => {
		res.status(200).json({'user': 'User added Successfully', 'data' :item});
	}).catch(err => {
		res.status(400).send("Unable to save database");
	});
});

// get all users
router.route('/getUsers').get(function(req, res) {
	User.find(function(err, users) {
		if (err){
			res.send(err);
		}
		res.json(users);
	});
 });


module.exports = router;
