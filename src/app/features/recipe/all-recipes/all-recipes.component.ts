import { Component, OnInit } from '@angular/core';
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

  ngOnInit(){
    this.getAll();
  }

  getAll() {
    this._recipeService.getAllRecipes().subscribe((allRecipes : Recipe[]) => {
      this.recipes = allRecipes
    });
  }

}
