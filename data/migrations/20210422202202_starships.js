exports.up = function (knex) {
	return knex.schema.createTable('starships', (tbl) => {
		tbl.increments();
		tbl.text('name', 256).unique().notNullable();
		tbl.text('class', 256).notNullable;
	});
};

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('starships');
};
