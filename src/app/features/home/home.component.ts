import { Component } from '@angular/core';
import { Recipe } from 'src/app/shared/model/cookbook';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { RecipeService } from 'src/app/shared/service/recipe.service';
import { SearchRecipeComponent } from '../recipe/search-recipe/search-recipe.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  result! : Recipe;
  name! : string;

  constructor(private _recipeService : RecipeService,
    private dialog: MatDialog,
    private notif : NotificationService) {}

  searchRecipe(){
    this._recipeService.searchRecipeByName(this.name).subscribe(
      data => {
        this.result = data;
        this.openModal(this.result);
      },
      error => {
        this.notif.noRecipe("Recette introuvable");
    })
  }

  openModal(result: Recipe) {
    const dialogRef = this.dialog.open(SearchRecipeComponent, {
      data: { result: result }
    });
  }


}
