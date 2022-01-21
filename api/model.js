const db = require('../data/db-config.js');

async function getRecipeById(recipe_id) {
	const rows = await db('recipes as r')
		.leftJoin('steps as s', 'r.recipe_id', 's.recipe_id')
		.leftJoin('steps_ingredients as s_i', 's_i.step_id', 's.step_id')
		.leftJoin('ingredients as i', 'i.ingredient_id', 's_i.ingredient_id')
		.select(
			's.recipe_id',
			'r.recipe_name',
			's.step_id',
			's.step_number',
			's.instruction as step_instructions',
			'i.ingredient_name',
			's_i.quantity',
			'i.ingredient_id'
		)
		.orderBy('step_number')
		.where('s.recipe_id', recipe_id)

	// return rows
	// const rows = await db('steps as s')
	// .leftJoin('steps_ingredients as s_i', 's_i.step_id', 's.step_id')
	// .leftJoin('recipes as r', 'r.recipe_id', 's.recipe_id')
	// .leftJoin('ingredients as i', 's_i.ingredient_id', 'i.ingredient_id')
	// .where('r.recipe_id', recipe_id)
	// .orderBy('s.step_number')
	// .select(
	// 	's.recipe_id', 'r.recipe_name',
	// 	's.step_id', 's.step_number',
	// 	's.instruction as step_instructions',
	// 	'i.ingredient_name', 's_i.quantity',
	// 	'i.ingredient_id'
	// )

	// const savior = rows.reduce((ingredients, ingredient) => {
	// 	const {
	// 		ingredient_id,
	// 		ingredient_name,
	// 		quantity
	// 	} = ingredient
	// 	if (!ingredient_id) {
	// 		return ingredients.concat([])
	// 	}
	// 	return ingredients.concat({
	// 		ingredient_id,
	// 		ingredient_name,
	// 		quantity
	// 	})
	// }, [])

	const result = {
		recipe_id: rows[0].recipe_id,
		recipe_name: rows[0].recipe_name,
		steps: rows.reduce((acc, row) => {
			if (!row.ingredient_id) {
				//no ingredients = []
				return acc.concat({
					step_id: row.step_id,
					step_number: row.step_number,
					step_instructions: row.step_instructions,
				})
			}
			if (row.ingredient_id && !acc.find(i => { i.step_id === row.step_id })) {
				//where there is an ingredient
				return acc.concat({
					step_id: row.step_id,
					step_number: row.step_number,
					step_instructions: row.step_instructions,
					ingredients: [
						{
							ingredient_id: row.ingredient_id,
							ingredient_name: row.ingredient_name,
							quantity: row.quantity,
						}
					]
				})
			}

			// if you already used the step
			const currentStep = acc.find(i => { i.step_id === row.step_id })

			currentStep.ingredients.push({
				ingredient_id: row.ingredient_id,
				ingredient_name: row.ingredient_name,
				quantity: row.quantity,
			})
			return acc
		}, [])
	}
	return result
}

module.exports = {
	getRecipeById,
}
