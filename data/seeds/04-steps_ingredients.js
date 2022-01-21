
exports.seed = function(knex, Promise) {
  return knex('steps_ingredients').insert([
    { step_id: 1, ingredient_id: 3, quantity: 56 },
		{ step_id: 1, ingredient_id: 1, quantity: 73 },
		{ step_id: 2, ingredient_id: 4, quantity: 200 },
		{ step_id: 4, ingredient_id: 2, quantity: 156.45 },
		{ step_id: 6, ingredient_id: 5, quantity: 4.79 },		
  ]);
};
