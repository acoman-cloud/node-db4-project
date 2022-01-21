const db = require('../data/db-config.js');

async function getRecipeById(recipe_id) {
	const rows = await db('steps as s')
		.leftJoin('steps_ingredients as s_i', 's_i.step_id', 's.step_id')
		.leftJoin('recipes as r', 'r.recipe_id', 's.recipe_id')
		.leftJoin('ingredients as i', 's_i.ingredient_id', 'i.ingredient_id')
		.where('r.recipe_id', recipe_id)
		.orderBy('s.step_number')
		.select(
			's.recipe_id', 'r.recipe_name',
			's.step_id', 's.step_number',
			's.instruction as step_instructions',
			'i.ingredient_name', 's_i.quantity',
			'i.ingredient_id'
		)

	const result = {
		recipe_id: rows[0].recipe_id,
		recipe_name: rows[0].recipe_name,
		steps: rows.reduce((steps, step) => {
			const {
				step_id,
				step_number,
				step_instructions,
				ingredient_id,
				ingredient_name,
				quantity
			} = step
			if (!ingredient_id) {
				return steps.concat({
					step_id,
					step_number,
					step_instructions,
					ingredients: []
				})
			}
			return steps.concat({
				step_id,
				step_number,
				step_instructions,
				ingredients: {
					ingredient_id,
					ingredient_name,
					quantity
				}
			})
		}, [])
	}
	return result
}

module.exports = {
	getRecipeById,
}
