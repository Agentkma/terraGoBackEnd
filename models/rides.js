const mongoose = require('mongoose');

const RideSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: true,
		trim: true
	},
	trackTimeTotal: {
		type: String,
		required: true,
		trim: true
	},
	trackAvgSpeed: {
		type: Number,
		required: true
	},
	trackDistance: {
		type: Number,
		required: Number
	},
	trackAvgPower: {
		type: Number,
		required: true
	},
	trackAvgCadence: {
		type: Number,
		required: true
	},
	trackAvgHeartRate: {
		type: Number,
		required: true
	},
	title: {
		type: String,
		required: true,
		trim: true
	},
	notes: {
		type: String,
		required: true,
		trim: true
	}
});
// authenticate login credentials against database documents
RideSchema.statics.authenticate = function (email, password, callback) {
	// //query to find email given
	// User.findOne({ email }).exec((error, user) => {
	// 	if (error) {
	// 		return callback(error);
	// 	} else if (!user) {
	// 		const error = new Error('User not found.');
	// 		error.status = 401;
	// 		return callback(error);
	// 	}
	// 	// user bcrypt compare method to comaper password used to login with hashd version on database
	// 	bcrypt.compare(password, user.password, (error, result) => {
	// 		if (result === true) {
	// 			// pass null in lieu of error because result is true
	// 			return callback(null, user);
	// 		}
	// 		return callback();
	// 	});
	// });
};

// hash password before saving to database
// RideSchema.pre('save', function (next) {
// 	const user = this;

// bcrypt.hash(user.password, 10, (error, hash) => {
// 	if (error) {
// 		next(error);
// 	} else {
// 		user.password = hash;
// 		next();
// 	}
// });
// });

const Ride = mongoose.model('Ride', RideSchema);
module.exports = Ride;
