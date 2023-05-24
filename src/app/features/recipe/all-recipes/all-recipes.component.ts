import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/shared/model/cookbook';
import { RecipeService } from 'src/app/shared/service/recipe.service';

@Component({
  selector: 'app-all-recipes',
  templateUrl: './all-recipes.component.html',
  styleUrls: ['./all-recipes.component.scss']
})
export class AllRecipesComponent implements OnInit{
  index! : number;

  recipes : Recipe[] = [];
  result! : Recipe;
  name! : string;

  constructor(private _recipeService : RecipeService,  private router: Router) {}

  ngOnInit(){
    this.getAll();
  }

  getAll() {
    this._recipeService.getAllRecipes().subscribe((allRecipes : Recipe[]) => {
      this.recipes = allRecipes
    });
  }

  searchRecipe(){
    this._recipeService.searchRecipeByName(this.name).subscribe(
      data => {
        this.result = data
      },
      error => {
        console.log(error);
    })
  }

  deleteRecipe(id: number){
    this._recipeService.deleteRecipe(id).subscribe(() => {
      this.recipes.findIndex(recipe => recipe.id === id);
      this.recipes.splice(this.index, 1);
    });
   }

   goBack() {
    this.router.navigate(['']);
  }



}
