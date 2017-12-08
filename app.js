require('dotenv').config();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const routes = require('./routes/index');
const admin = require('firebase-admin');
const serviceAccount = require('./trainride-5d227-firebase-adminsdk-2ed8g-7050d51ac5.json');
const express = require('express');

const app = express();

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

// stores login info on mongo
// const MongoStore = require('connect-mongo')(session);

//mongoDB connection
mongoose.connect('mongodb://localhost:27017/terraGoBackEnd', {
	useMongoClient: true
});
const db = mongoose.connection;
//mongo error
db.on('error', console.error.bind(console, 'connection error:'));

//initialize Firebase Admin SDK
admin.initializeApp({
	credential: admin.credential.cert({
		projectId: 'trainride-5d227',
		clientEmail: 'firebase-adminsdk-2ed8g@trainride-5d227.iam.gserviceaccount.com',
		privateKey: process.env.PRIVATE_KEY
	}),
	databaseURL: 'https://trainRide.firebaseio.com'
});

// Authenticate user before CRUD: "idToken" comes from the client app/ terraGO
app.use((req, res, next) => {
	const idToken = req.body.userId;
	admin
		.auth()
		.verifyIdToken(idToken)
		.then(decodedToken => {
			const userId = decodedToken.uid;

			req.userId = userId;
			next();
		})
		.catch(err => {
			// Handle error
			console.log(err);
			err = new Error('User Not Authenticated');
			err.status = 401;
			next(err);
		});
});

// include routes
app.use('/', routes);

// error handler
app.use((err, req, res, next) => {
	// res.status(err.status || 500);
	console.log('express error', err);
	res.status(err.status || 500).send(err.body);
	// res.send('error', {
	// 	message: err.message,
	// 	error: {}
	// });
});

// define as the last app.use callback
// catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new Error('File Not Found');
	err.status = 404;
	next(err);
});

// listen on port 3000
app.listen(3000, () => {
	console.log('Express app listening on port 3000');
});
