var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Users = new Schema({
	firstname: {
		type: String
	},
	lastname: {
		type: String
	},
	username: {
		type: String
	},
	password: {
		type: String
	}
},{
	collection: 'users'
});

module.exports = mongoose.model('Users',Users);