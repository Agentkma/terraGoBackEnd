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

// // pre allows doing stuff before inserting into db
// UserSchema.pre('save', next => {
// 	// const Users = this;
// 	//
// 	// bcrypt.hash(Users.password, 10, (error, hash) => {
// 	// 	if (error) {
// 	// 		next(error);
// 	// 	} else {
// 	// 		Users.password = hash;
// 	// 		next();
// 	// 	}
// 	// });
// });

const Users = mongoose.model('Users', UserSchema);
module.exports = Users;
