import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Aliment, Ingredient, Recipe } from 'src/app/shared/model/cookbook';
import { AlimentService } from 'src/app/shared/service/aliment.service';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { RecipeService } from 'src/app/shared/service/recipe.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss']
})
export class EditRecipeComponent implements OnInit{
  id! : number;
  aliments! : Aliment[];
  recipe! : Recipe;
  ingredients! : Ingredient[];
  ingredient! : Ingredient;
  editForm! : FormGroup;

  constructor(private _route : ActivatedRoute,
    private _router: Router,
    private _recipeService : RecipeService,
    private _alimentService : AlimentService,
    private _notif : NotificationService,
    private _fb: FormBuilder) {}

  ngOnInit() {
    //this.id = this._route.snapshot.params['id'];
    //this.editRecipe(this.id);
    //this.editIngredient(this.id);

    this.editForm = this._fb.group({
      name: [null, Validators.required],
      tempsCuisson: [null, Validators.required],
      instruction: [null, Validators.required],
      ingredients: this._fb.array([])
    });

    this.getAliments();

    const recipeId = this._route.snapshot.params['id'];
    this._recipeService.getOneRecipe(recipeId).subscribe((recipe: Recipe) => {
      this.editForm.patchValue({
        name: recipe.name,
        tempsCuisson: recipe.tempsCuisson,
        instruction: recipe.instruction
      });
      this._recipeService.getIngredientsByRecipe(recipeId).subscribe(
        (response: Ingredient[]) => {
          this.ingredients = response;
        },
        (error) => {
          console.log(error);
        }
      );

      if (recipe && recipe.Ingredient) {
        const ingredientsFormArray = this.editForm.get('ingredients') as FormArray;
        recipe.Ingredient.forEach((ingredient: Ingredient) => {
          const ingredientFormGroup = this._fb.group({
            name: [ingredient.name, Validators.required],
            uniteMesure: [ingredient.uniteMesure, Validators.required],
            quantity: [ingredient.quantity, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/), Validators.min(1)]],
            alimentId: [ingredient.id, Validators.required]
          });
          ingredientsFormArray.push(ingredientFormGroup);
        });
      }
    });
  }





  // editRecipe(id: number){
  //   this.editForm = this._fb.group({
  //     name: '',
  //     tempsCuisson: '',
  //     instruction: '',
  //     ingredients: this._fb.array([])
  //   });
  //   this._recipeService.getOneRecipe(id).subscribe(
  //     recipe => {
  //       this.editForm.patchValue({
  //         name: recipe.name,
  //         tempsCuisson: recipe.tempsCuisson,
  //         instruction: recipe.instruction
  //       });
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );
  // }

  // editIngredient(id: number) {
  //   this._recipeService.getIngredientsByRecipe(id).subscribe(
  //     (ingredients: Ingredient[]) => {
  //       this.ingredients = ingredients;
  //     })
  // }


  getAliments() {
    this._alimentService.getAllAliments().subscribe((allAliments: Aliment[]) => {
      this.aliments = allAliments;
    });
  }

  //onUpdate(id : number){
  onUpdate(){
    const recipeId = this._route.snapshot.params['id'];
    this._recipeService.updateRecipe(recipeId, this.editForm.value).subscribe(() => {
      this.editForm.reset();
      this._notif.openSnackBar("Recette correctement mise à jour !");
      //this._router.navigate([`/one-recipe/${this.id}`])
      this._router.navigate(['/all-recipes']);
    })
  }

  goBack() {
    this._router.navigate(['../'], {relativeTo: this._route});
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


  getIngredientsControls() {
    return (this.editForm.get('ingredients') as FormArray).controls;
  }



}
