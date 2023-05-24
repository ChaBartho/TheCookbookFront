import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ingredient, Recipe } from 'src/app/shared/model/cookbook';
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

  constructor(private _route : ActivatedRoute, private _recipeService : RecipeService,  private router: Router){}

  ngOnInit() {
    this.id = this._route.snapshot.params['id'];
    this.getOneRecipe(this.id);
    this.getIngredients(this.id);
  }

  getOneRecipe(id : number){
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
    })
  }

  goBack() {
    this.router.navigate(['/all-recipes']);
  }


}
