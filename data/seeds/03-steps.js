
exports.seed = function(knex, Promise) {
  return knex('steps').insert([
		{ instruction: 'put tomato sauce and olive oil on', step_number: 4, recipe_id: 1},
		{ instruction: 'boil water in pot', step_number: 1, recipe_id: 1},
		{ instruction: 'when spaghetti cooked, take out', step_number: 3, recipe_id: 1},
    { instruction: 'put spaghetti in', step_number: 2, recipe_id: 1},
		{ instruction: 'enjoy', step_number: 5, recipe_id: 1},
		{ instruction: 'pour money onto cashier', step_number: 2, recipe_id: 2},
		{ instruction: 'enjoy', step_number: 3, recipe_id: 2},
		{ instruction: 'drive to mcdonalds', step_number: 1, recipe_id: 2},
  ]);
};
