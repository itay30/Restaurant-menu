import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

import { Ingredient } from '../shared/ingredient.model'
import { ShoppingListService } from '../shopping-list/shopping-list.service'
import { Recipe } from "./recipe.model"

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>

  // private recipes: Recipe[] = [
  //     new Recipe(
  //       'Tasty schnitzel',
  //       'Super tasty schnitzel - just awesome!',
  //       'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Breitenlesau_Krug_Br%C3%A4u_Schnitzel.JPG/1200px-Breitenlesau_Krug_Br%C3%A4u_Schnitzel.JPG',
  //       [
  //         new Ingredient('Meat', 1),
  //         new Ingredient('French Fries', 20)
  //       ]),
  //     new Recipe(
  //       'Big fat burger', 
  //       'what else you need to say?', 
  //       'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Hamburger_%28black_bg%29.jpg/1200px-Hamburger_%28black_bg%29.jpg',
  //       [
  //         new Ingredient('Buns', 2),
  //         new Ingredient('Meat', 1)
  //       ])]

  private recipes: Recipe[] = []

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes
    this.recipesChanged.next(this.recipes.slice())
  }

  getRecipes() {
    return this.recipes.slice()
  }

  getRecipe(index: number){
    return this.recipes[index]
  }
  
  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients)
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe)
    this.recipesChanged.next(this.recipes.slice())
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe
    this.recipesChanged.next(this.recipes.slice())
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1)
    this.recipesChanged.next(this.recipes.slice())
  }
}