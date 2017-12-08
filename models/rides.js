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

const Ride = mongoose.model('Ride', RideSchema);
module.exports = Ride;
