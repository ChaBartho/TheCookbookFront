import { Component, OnInit } from '@angular/core';
import { Observer } from 'rxjs';
import { Recipe } from 'src/app/shared/model/cookbook';
import { RecipeService } from 'src/app/shared/service/recipe.service';

@Component({
  selector: 'app-all-recipes',
  templateUrl: './all-recipes.component.html',
  styleUrls: ['./all-recipes.component.scss']
})
export class AllRecipesComponent implements OnInit{

  recipes! : Recipe[]

  constructor(private _recipeService : RecipeService) {}

  ngOnInit(): void {

    const observer: Observer<Recipe[]> = {
      next: (recipes: Recipe[]) => {
        this.recipes = recipes;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('Observable completed');
      }
    };

    this._recipeService.getAllRecipes().subscribe(observer);
  }



}
