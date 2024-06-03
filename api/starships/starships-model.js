const db = require('../../data/db-config');

const getAll = () => {
	return db('starships');
};

const getById = (id) => {
	return db('starships').where({ id }).first();
};

const insert = async (starship) => {
	const [id] = await db('starships').insert(starship);
	return db('starships').where({ id }).first();
};

const remove = (id) => {
	return db('starships').where('id', id).del();
};

module.exports = { getAll, getById, insert, remove };
