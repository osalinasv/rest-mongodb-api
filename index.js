const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// App base
const app = express();

// DB connection
mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise = global.Promise;

// Middleware - statics
app.use('/', express.static('./public'));

// Middleware - body-parser
app.use(bodyParser.json());

// Routes
app.use('/api', require('./routes/api'));

// Middleware - error handling
app.use((error, request, response, next) => {
	response.status(422).send({
		error: error.message
	});
});

// Listener
app.listen(process.env.port || 4000, () => {
	console.log('API listening for requests...');
});
