import { Resolver, Query, Arg, Args, Mutation } from 'type-graphql';
import { Service } from 'typedi';

import Recipe from '../types/recipe';
import RecipeService from '../../services/recipe-service';
import RecipesArgs from '../parameters/recipes-args';
import NewRecipeInput from '../parameters/new-recipe-input';
import RecipeNotFoundError from '../../exceptions/recipe-not-found-error';

@Service()
@Resolver(Recipe)
class RecipeResolver {
	constructor(private recipeService: RecipeService) {}

	@Query((returns) => Recipe)
	async recipe(@Arg('id') id: string) {
		const recipe = await this.recipeService.findById(id);
		if (recipe === undefined) {
			throw new RecipeNotFoundError(id);
		}
		return recipe;
	}

	@Query((returns) => [Recipe])
	recipes(@Args() { skip, take }: RecipesArgs) {
		return this.recipeService.findAll({ skip, take });
	}

	@Mutation((returns) => Recipe)
	addRecipe(
		@Arg('newRecipeData') newRecipeData: NewRecipeInput,
	): Promise<Recipe> {
		return this.recipeService.addNew({ data: newRecipeData });
	}

	@Mutation((returns) => Boolean)
	async removeRecipe(@Arg('id') id: string) {
		try {
			await this.recipeService.removeById(id);
			return true;
		} catch {
			return false;
		}
	}
}

export default RecipeResolver;