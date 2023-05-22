import { Component } from '@angular/core';
import { Form, FormArray, FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from 'src/app/shared/service/recipe.service';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.scss']
})
export class CreateRecipeComponent{

  recipeIngredients = new FormArray([]);
  message : string = '';

  constructor(private _formBuilder : FormBuilder, private _recipeService : RecipeService){}

  recipeForm : FormGroup = this._formBuilder.group({
      name: ['', [Validators.required]],
      instruction: ['', [Validators.required]],
      tempsCuisson: ['', [Validators.required]],
      ingredients: this._formBuilder.array([])
    });


  onSubmit() {
    this._recipeService.addRecipe(this.recipeForm.value).subscribe();
    this.message = 'Recette bien ajoutée !';
    this.recipeForm.reset();
  }




  deleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  addIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        quantity: new FormControl('', [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }


}
