
exports.seed = function(knex, Promise) {
	return knex('recipes').insert([
		{ recipe_name: 'Spaghetti Bolognese' },
		{ recipe_name: 'Double Quarter Pounder'},
		{ recipe_name: 'Toasted Bread'},
	])
}