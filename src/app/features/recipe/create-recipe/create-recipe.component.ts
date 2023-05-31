import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Aliment } from 'src/app/shared/model/cookbook';
import { AlimentService } from 'src/app/shared/service/aliment.service';
import { RecipeService } from 'src/app/shared/service/recipe.service';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.scss']
})
export class CreateRecipeComponent implements OnInit{
  aliments : Aliment[] = [];
  recipeForm! : FormGroup;

  constructor(private _recipeService : RecipeService, private _alimentService : AlimentService, private route: ActivatedRoute, private router: Router){}

  ngOnInit() {
    this.initForm();
    this.getAliments();
  }

  onSubmit(){
    console.log(this.recipeForm)
    this._recipeService.addRecipe(this.recipeForm.value).subscribe(() => {
      this.recipeForm.reset();
      this.router.navigate(['/all-recipes']);
    })
  }

  addIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl('', Validators.required),
        'uniteMesure': new FormControl('', Validators.required),
        'quantity': new FormControl('', [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
        'alimentId' : new FormControl('', Validators.required)
      })
    );
  }

  deleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  goBack() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm(){
    let recipeName = '';
    let recipeTempsCuisson = '';
    let recipeInstruction = '';
    let recipeAliment = '';

    let recipeIngredients = new FormArray([
      new FormGroup({
        'name': new FormControl('', Validators.required),
        'uniteMesure': new FormControl('', Validators.required),
        'quantity': new FormControl('', [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
        'alimentId': new FormControl(recipeAliment, Validators.required)
      })
    ]);

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'tempsCuisson': new FormControl(recipeTempsCuisson, Validators.required),
      'instruction': new FormControl(recipeInstruction, Validators.required),
      'ingredients': recipeIngredients
    })
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  getAliments() {
    this._alimentService.getAllAliments().subscribe((allAliments : Aliment[]) => {
      this.aliments = allAliments
      console.log(this.aliments);
    });
  }

}
