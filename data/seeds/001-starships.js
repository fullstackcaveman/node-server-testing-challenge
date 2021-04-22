exports.seed = function (knex, Promise) {
	return knex('starships')
		.truncate()
		.then(function () {
			return knex('starships').insert([
				{ name: 'CR90 Corvette', class: 'Corvette' },
				{ name: 'Star Destroyer', class: 'Star Destroyer' },
				{ name: 'Death Star', class: 'Deep Space Mobile Battlestation' },
			]);
		});
};
