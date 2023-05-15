import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Recipe } from 'src/app/shared/model/cookbook';
import { RecipeService } from 'src/app/shared/service/recipe.service';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.scss']
})
export class CreateRecipeComponent implements OnInit{

  recipeForm! : FormGroup

  constructor(private _formBuilder : FormBuilder, private _recipeService : RecipeService){}


  ngOnInit(): void {
    this.recipeForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      instruction: ['', [Validators.required]],
      tempsCuisson: ['', [Validators.required]],
      quantity: ['', [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]],
      Ingredient: this._formBuilder.array([])
    });
  }

  onSubmit() {
    const recipe = this.recipeForm.value;
    this._recipeService.addRecipe(recipe).subscribe();
    this.recipeForm.reset();
  }





}
