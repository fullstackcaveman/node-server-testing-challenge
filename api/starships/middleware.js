const Starships = require('../starships/starships-model');

const validateStarshipId = async (req, res, next) => {
	const id = req.params.id;

	try {
		const starship = await Starships.getById(id);
		if (!starship) {
			res.status(404).json({ message: 'Starship not found' });
		} else {
			req.starship = starship;
			console.log(req.starship);
			next();
		}
	} catch (err) {
		res.status(500).json(err.message);
	}
};

module.exports = { validateStarshipId };
