const express = require('express');
const mongoose = require('mongoose');
const Promise = require('bluebird');
mongoose.Promise = Promise;
const User = require('../models/users.js');
const Ride = require('../models/rides.js');
const router = express.Router();
const mid = require('../middleware');

// GET / user profile
router.get('/user', (req, res, next) => {
	//get info if userId in place
	const query = User.findOne({ userId: req.userId });

	query.exec((error, user) => {
		if (error) {
			return next(error);
		}

		const status = 200;
		return res.status(status).send(user);
	});
});

// PUT  / update profile
router.put('/user', (req, res, next) => {
	//   create object
	const profileData = {
		userId: req.userId || null,
		name: req.body.name,
		location: req.body.location,
		bio: req.body.bio
	};

	//use schema's create method to insert into db
	User.update(profileData)
		.then(() => res.send('update profile success'))
		.catch(next);
});

//POST / create profile
router.post('/user', (req, res, next) => {
	// check that all fields have values
	if (req.userId && req.body.name && req.body.location && req.body.bio) {
		//   create object t
		const profileData = {
			userId: req.userId || null,
			name: req.body.name,
			location: req.body.location,
			bio: req.body.bio
		};

		//use schema's create method to insert into db
		User.create(profileData, error => {
			if (error) {
				return next(error);
			}

			return res.send('post profile success');
		});
	} else {
		const error = new Error('All Fields Required.');
		//   400 = bad request
		error.status = 400;
		return next(error);
	}
});

// GET / all rides
router.get('/ride', (req, res, next) => {
	//get info if userId in place
	const query = Ride.find({ userId: req.userId });
	console.log('userId', req.userId);

	query.exec((error, ride) => {
		if (error) {
			return next(error);
		}

		const status = 200;
		console.log(ride);
		return res.status(status).send(ride);
	});
});

// POST /ride
router.post('/ride', (req, res, next) => {
	// check that all  form fields have values
	if (
		req.userId &&
		req.body.trackTimeTotal &&
		req.body.trackAvgSpeed &&
		req.body.trackDistance &&
		req.body.trackAvgPower &&
		req.body.trackAvgCadence &&
		req.body.trackAvgHeartRate &&
		req.body.title &&
		req.body.notes
	) {
		//   create object t
		const rideData = {
			userId: req.userId || null,
			trackTimeTotal: req.body.trackTimeTotal,
			trackAvgSpeed: req.body.trackAvgSpeed,
			trackDistance: req.body.trackDistance,
			trackAvgPower: req.body.trackAvgPower,
			trackAvgCadence: req.body.trackAvgCadence,
			trackAvgHeartRate: req.body.trackAvgHeartRate,
			title: req.body.title,
			notes: req.body.notes
		};

		console.log('route rideData object', rideData);

		//use schema's create method to insert into db
		Ride.create(rideData, error => {
			if (error) {
				return next(error);
			}

			return res.send('post ride success');
		});
	} else {
		const error = new Error('All Fields Required.');
		//   400 = bad request
		error.status = 400;
		return next(error);
	}
});

// DELETE / selected ride
router.delete('/ride/:id', (req, res, next) => {
	const id = req.params.id;
	console.log('url param', id);
	const query = Ride.deleteOne({ userId: req.userId, _id: id });

	query.exec((error, user) => {
		if (error) {
			return next(error);
		}

		const status = 200;
		return res.status(status).send(user);
	});
});

module.exports = router;
