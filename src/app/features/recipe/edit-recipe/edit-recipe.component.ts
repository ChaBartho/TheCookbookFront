import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Aliment, Ingredient, Recipe } from 'src/app/shared/model/cookbook';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { RecipeService } from 'src/app/shared/service/recipe.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss']
})
export class EditRecipeComponent implements OnInit{
  id! : number;
  aliments : Aliment[] = [];
  recipe! : Recipe;
  ingredients! : Ingredient[];
  ingredient! : Ingredient;
  editForm! : FormGroup;
  ingredientsForm! : FormArray;

  constructor(private _route : ActivatedRoute,
    private _router: Router,
    private _recipeService : RecipeService,
    private _notif : NotificationService,
    private _fb: FormBuilder) {}

  ngOnInit() {
    this.id = this._route.snapshot.params['id'];
    this.editRecipe(this.id);
  }

  editRecipe(id: number){
    this.editForm = this._fb.group({
      name: '',
      tempsCuisson: '',
      instruction: '',
      ingredients: this._fb.array([])
    });
    this._recipeService.getOneRecipe(id).subscribe(
      recipe => {
        this.editForm.patchValue({
          name: recipe.name,
          tempsCuisson: recipe.tempsCuisson,
          instruction: recipe.instruction
        });
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


  update(id : number){
    this._recipeService.updateRecipe(id, this.editForm.value).subscribe(() => {
      this._notif.openSnackBar("Recette correctement mise à jour !");
    })
  }

  goBack() {
    this._router.navigate(['../'], {relativeTo: this._route});
  }

  get controls() {
    return (<FormArray>this.editForm.get('ingredients')).controls;
  }

  addIngredient(){
    (<FormArray>this.editForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl('', Validators.required),
        'uniteMesure': new FormControl('', Validators.required),
        'quantity': new FormControl('', [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
        'alimentId' : new FormControl('', Validators.required)
      })
    );
  }

  deleteIngredient(index: number) {
    (<FormArray>this.editForm.get('ingredients')).removeAt(index);
  }


}
