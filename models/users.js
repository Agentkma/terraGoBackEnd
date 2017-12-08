const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: true,
		trim: true
	},
	name: {
		type: String,
		required: true,
		trim: true
	},
	location: {
		type: String,
		required: true,
		trim: true
	},

	bio: {
		type: String,
		required: true,
		trim: true
	}
});

const Users = mongoose.model('Users', UserSchema);
module.exports = Users;
