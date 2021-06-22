import { Service } from 'typedi';
import NewRecipeInput from '../graphql/parameters/new-recipe-input';
import Recipe from '../graphql/types/recipe';

@Service()
class RecipeService {

    private _recipes: Recipe[];

    constructor() {
        this._recipes = getRecipes();
    }

    findById(id: string) {
        return this._recipes.find(recipe => recipe.id === id);
    }

    findAll({skip, take}: { skip: number, take: number }) {
        return this._recipes.slice(skip, take);
    }


    addNew({ data }: {data: NewRecipeInput}): Promise<Recipe> {
        return new Promise<Recipe>((resolve, reject) => {
            if (Object.values(data).some(value => !value)) {
                reject('Missing details in new recipe!!');
            }
            const newRecipe = this.constructRecipeFromInput(data);
            this._recipes = [...this._recipes, newRecipe];
            resolve(newRecipe);
        });
    }

    private constructRecipeFromInput(data: NewRecipeInput): Recipe {
        return {
            id: this._recipes.length.toString(),
            creationDate: new Date(),
            ...data
        }
    }

    removeById(id: string) {
        return new Promise((resolve, reject) => {
            const filteredRecipes = this._recipes.filter(recipe => recipe.id !== id);
            if (filteredRecipes.length !== this._recipes.length) {
                this._recipes = [...filteredRecipes];
                resolve(null);
            } else {
                throw new Error("Recipe doesn't exist!!");
            }
        })
    }
}

function getRecipes() {
    return [
        {
            id: '1', 
            creationDate: new Date(), 
            ingredients: ['carrots'], 
            title: 'carrot cake', 
            description: 'tastiest carrot cake'
        },
        {
            id: '2', 
            creationDate: new Date(), 
            ingredients: ['tomatoes', 'penne paste'], 
            title: 'pasta', 
            description: 'italian dish'
        }
    ];
}


export default RecipeService;