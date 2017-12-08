require('dotenv').config();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const routes = require('./routes/index');
const admin = require('firebase-admin');
const express = require('express');

const app = express();
const port = Number(process.env.PORT || 3000);

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
	// TODO	 change to 1st idToken below after hosting...and confirm getting value
	// const idToken = req.auth.userId;
	// this idToken just for Postman testing purposes
	const idToken = req.rawHeaders[3];

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

// listen on port Heroku Link OR 3000
app.listen(port, () => {
	console.log(`Express app listening on port ${port}.`);
});
