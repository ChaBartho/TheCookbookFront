import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ingredient, Recipe } from 'src/app/shared/model/cookbook';
import { RecipeService } from 'src/app/shared/service/recipe.service';

@Component({
  selector: 'app-search-recipe',
  templateUrl: './search-recipe.component.html',
  styleUrls: ['./search-recipe.component.scss']
})
export class SearchRecipeComponent implements OnInit{
  id! : number;
  ingredients! : Ingredient[];

  @Input() result!: Recipe;

  constructor(private _route : ActivatedRoute, private _recipeService : RecipeService){}

  ngOnInit(): void {
    this.id = this._route.snapshot.params['id'];
    this.getIngredients(this.id);
  }

  getIngredients(id: number) {
    this._recipeService.getIngredientsByRecipe(id).subscribe((ingredients: Ingredient[]) => {
    this.ingredients = ingredients;
    })
  }




}
