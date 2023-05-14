import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './core/navbar/navbar.component';
import { ShoppingListComponent } from './features/shopping-list/shopping-list.component';
import { AllRecipesComponent } from './features/recipe/all-recipes/all-recipes.component';
import { OneRecipeComponent } from './features/recipe/one-recipe/one-recipe.component';
import { EditRecipeComponent } from './features/recipe/edit-recipe/edit-recipe.component';
import { CreateRecipeComponent } from './features/recipe/create-recipe/create-recipe.component';
import { EditShoppingListComponent } from './features/shopping-list/edit-shopping-list/edit-shopping-list.component';
import { AuthComponent } from './core/auth/auth.component';

const routes: Routes = [
  {path: '', component: NavbarComponent},
  {path: 'allRecipes', component: AllRecipesComponent, children : [
    {path: ':id', component: OneRecipeComponent},
    {path: 'edit-recipe', component: EditRecipeComponent},
    {path: 'create-recipe', component: CreateRecipeComponent}
  ]},
  {path: 'shopping-list', component: ShoppingListComponent, children : [
    {path: 'edit-shopping-list', component: EditShoppingListComponent}
  ]},
  {path: 'authentication', component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
