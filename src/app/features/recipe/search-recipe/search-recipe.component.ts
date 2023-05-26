import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ingredient, Recipe } from 'src/app/shared/model/cookbook';
import { RecipeService } from 'src/app/shared/service/recipe.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-search-recipe',
  templateUrl: './search-recipe.component.html',
  styleUrls: ['./search-recipe.component.scss']
})
export class SearchRecipeComponent implements OnInit{
  id! : number;
  ingredients! : Ingredient[];
  result! : Recipe;

  //@Input() result!: Recipe;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { result: Recipe },
  private _route : ActivatedRoute, private _recipeService : RecipeService,
  public dialogRef: MatDialogRef<SearchRecipeComponent>) {
    this.result = data.result;
    this.getIngredients(this.result.id);
  }

  ngOnInit() {
    this.id = this._route.snapshot.params['id'];
    this.getIngredients(this.id);
  }

  getIngredients(id: number) {
    this._recipeService.getIngredientsByRecipe(id).subscribe((ingredients: Ingredient[]) => {
    this.ingredients = ingredients;
    })
  }

  closeModal(): void{
    this.dialogRef.close();
  }
}
