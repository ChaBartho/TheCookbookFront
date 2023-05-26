import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Recipe } from 'src/app/shared/model/cookbook';
import { RecipeService } from 'src/app/shared/service/recipe.service';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { SearchRecipeComponent } from '../search-recipe/search-recipe.component';


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

  constructor(private _recipeService : RecipeService,
    private dialog: MatDialog,
    private notif : NotificationService) {}

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



  deleteRecipe(id: number){
    this._recipeService.deleteRecipe(id).subscribe(() => {
      this.index = this.recipes.findIndex(recipe => recipe.id === id);
      this.recipes.splice(this.index, 1);
      this.notif.openSnackBar("Recette bien supprimée");
    });
   }

  async confirmation(id: number): Promise<boolean> {
    const dialogRef = this.dialog.open(PopUpComponent, {
      data: {id: id}
    });
    const result = await dialogRef.afterClosed().toPromise();
    return result === true;
  }

  async onDelete(id: number) {
    const isConfirmed = await this.confirmation(id);
    if (isConfirmed) {
      this.deleteRecipe(id);
    }
  }

}
