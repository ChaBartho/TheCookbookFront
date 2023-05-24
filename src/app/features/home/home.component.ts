import { Component } from '@angular/core';
import { Recipe } from 'src/app/shared/model/cookbook';
import { RecipeService } from 'src/app/shared/service/recipe.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  result! : Recipe;
  name! : string;

  constructor(private _recipeService : RecipeService) {}

  searchRecipe(){
    this._recipeService.searchRecipeByName(this.name).subscribe(
      data => {
        this.result = data
      },
      error => {
        console.log(error);
    })
  }

}
