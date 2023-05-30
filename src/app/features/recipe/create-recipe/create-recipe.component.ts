import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Aliment } from 'src/app/shared/model/cookbook';
import { AlimentService } from 'src/app/shared/service/aliment.service';
import { RecipeService } from 'src/app/shared/service/recipe.service';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.scss']
})
export class CreateRecipeComponent implements OnInit{

  recipeForm! : FormGroup;
  name! : string;

  constructor(private _recipeService : RecipeService, private _alimentService : AlimentService, private route: ActivatedRoute, private router: Router){}

  ngOnInit() {
    this.initForm();
  }


  onSubmit(){
    this._recipeService.addRecipe(this.recipeForm.value).subscribe(() => {
      this.recipeForm.reset();
      this.router.navigate(['/all-recipes']);
    })
  }

  addIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'uniteMesure': new FormControl(null, Validators.required),
        'quantity': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
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

    let recipeIngredients = new FormArray([
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'uniteMesure': new FormControl(null, Validators.required),
        'quantity': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
        'alimentId': new FormControl(null)
      })
    ]);

    recipeIngredients.valueChanges.subscribe((ingredients: any[]) => {
      ingredients.forEach((ingredient: any) => {
        const name = ingredient.name;
        this._alimentService.searchAlimentByName(name).subscribe((aliment: Aliment) => {
          recipeIngredients.controls.forEach((control: FormGroup) => {
            if (control.get('name')?.value === name) {
              control.patchValue({
                alimentId: aliment.id
              });
            }
          });
        });
      });
    });



    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'tempsCuisson': new FormControl(recipeTempsCuisson, Validators.required),
      'instruction': new FormControl(recipeInstruction, Validators.required),
      'ingredients': recipeIngredients
    })
  }

  searchAliment(name: string): Observable<Aliment> {
    return this._alimentService.searchAlimentByName(name);
  }



  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
}
