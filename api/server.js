const express = require('express');
const { validateStarshipId } = require('./starships/middleware');

const Starships = require('./starships/starships-model');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
	res.json({ api: 'running' });
});

server.get('/api/starships', (req, res) => {
	Starships.getAll()
		.then((starships) => {
			res.json(starships);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

server.post('/api/starships', (req, res) => {
	Starships.insert(req.body)
		.then((starship) => {
			res.status(201).json(starship);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

server.delete('/api/starships/:id', validateStarshipId, (req, res) => {
	Starships.remove(req.starship.id)
		.then(() => {
			res.json({ message: 'Starship Removed' });
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

module.exports = server;
