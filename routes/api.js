const express = require('express');
const router = express.Router();

const Ninja = require('../models/ninja');

// List ninjas
router.get('/ninjas', (request, response, next) => {
	const { name } = request.query;

	Ninja.find({ name: new RegExp(name, 'i') })
		.then((data) => {
			response.send(data);
		})
		.catch(next);
});

// Add a ninja
router.post('/ninjas', (request, response, next) => {
	Ninja.create(request.body)
		.then((data) => {
			response.send(data);
		})
		.catch(next);
});

// Update a ninja
router.put('/ninjas/:id', (request, response, next) => {
	const { id } = request.params;

	Ninja.findByIdAndUpdate({ _id: id }, request.body)
		.then(() => {
			Ninja.findOne({ _id: id })
				.then((data) => {
					response.send(data);
				});
		})
		.catch(next);
});

// Delete a ninja
router.delete('/ninjas/:id', (request, response, next) => {
	const { id } = request.params;

	Ninja.findByIdAndRemove({ _id: id })
		.then((data) => {
			response.send(data);
		})
		.catch(next);
});

module.exports = router;
