import { Component,OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Ingredient, Recipe } from 'src/app/shared/model/cookbook';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { RecipeService } from 'src/app/shared/service/recipe.service';
import { PopUpComponent } from '../pop-up/pop-up.component';

@Component({
  selector: 'app-one-recipe',
  templateUrl: './one-recipe.component.html',
  styleUrls: ['./one-recipe.component.scss']
})
export class OneRecipeComponent implements OnInit{
  index! : number;
  recipes : Recipe[] = [];
  id! : number;
  recipe! : Recipe;
  ingredients! : Ingredient[];

  constructor(private _route : ActivatedRoute,
    private _recipeService : RecipeService,
    private router: Router,
    private dialog: MatDialog,
    private notif : NotificationService){}

  ngOnInit() {
    this.id = this._route.snapshot.params['id'];
    this.getOneRecipe(this.id);
    //this.getIngredients(this.id);
  }

  getOneRecipe(id : number){
    this._recipeService.getOneRecipe(id).subscribe(
      recipe => {
        this.recipe = recipe;
        this._recipeService.getIngredientsByRecipe(id).subscribe(
          (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
          })
      },
      error => {
        console.log(error);
      }
    );
  }

  // getIngredients(id: number) {
  //   this._recipeService.getIngredientsByRecipe(id).subscribe((ingredients: Ingredient[]) => {
  //   this.ingredients = ingredients;
  //   })
  // }

  goBack() {
    this.router.navigate(['/all-recipes']);
  }

  deleteRecipe(id: number){
    this._recipeService.deleteRecipe(id).subscribe(() => {
      this.index = this.recipes.findIndex(recipe => recipe.id === id);
      this.recipes.splice(this.index, 1);
      this.notif.openSnackBar("Recette supprimée");
      this.router.navigate(['/all-recipes']);
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





  addOnetoSL(name: string){

    this.notif.openSnackBar("Bien ajouté !")
  }

  addAlltoSL(){

    this.notif.openSnackBar("Bien ajouté !")
  }


}
