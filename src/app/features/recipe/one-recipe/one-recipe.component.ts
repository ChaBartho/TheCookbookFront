import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Aliment, Ingredient, Recipe } from 'src/app/shared/model/cookbook';
import { IngredientService } from 'src/app/shared/service/ingredient.service';
import { RecipeService } from 'src/app/shared/service/recipe.service';

@Component({
  selector: 'app-one-recipe',
  templateUrl: './one-recipe.component.html',
  styleUrls: ['./one-recipe.component.scss']
})
export class OneRecipeComponent implements OnInit{

  id! : number;
  recipe! : Recipe;
  ingredients! : Ingredient[];
  aliments! : Aliment[];

  constructor(private _route : ActivatedRoute, private _recipeService : RecipeService, private _ingredientService : IngredientService){}

  ngOnInit() {
    this.id = this._route.snapshot.params['id'];
    this.getOne(this.id);
    this.getIngredients(this.id);
  }

  getOne(id : number){
    this._recipeService.getOneRecipe(id).subscribe(
      recipe => {
        this.recipe = recipe;
      },
      error => {
        console.log(error);
      }
    );
  }

  getIngredients(id: number) {
    this._recipeService.getIngredientsByRecipe(id).subscribe((ingredients: Ingredient[]) => {
    this.ingredients = ingredients;

    this._ingredientService.getAlimentByIngredients(id).subscribe((aliments: Aliment[]) => {
      this.aliments = aliments;
    })})

  }





}
