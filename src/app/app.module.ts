import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ShoppingListComponent } from './features/shopping-list/shopping-list.component';
import { CreateRecipeComponent } from './features/recipe/create-recipe/create-recipe.component';
import { AllRecipesComponent } from './features/recipe/all-recipes/all-recipes.component';
import { EditRecipeComponent } from './features/recipe/edit-recipe/edit-recipe.component';
import { OneRecipeComponent } from './features/recipe/one-recipe/one-recipe.component';
import { EditShoppingListComponent } from './features/shopping-list/edit-shopping-list/edit-shopping-list.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { AuthComponent } from './core/auth/auth.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { HomeComponent } from './features/home/home.component';
import { SearchRecipeComponent } from './features/recipe/search-recipe/search-recipe.component';




@NgModule({
  declarations: [
    AppComponent,
    ShoppingListComponent,
    NavbarComponent,
    AuthComponent,
    CreateRecipeComponent,
    AllRecipesComponent,
    EditRecipeComponent,
    OneRecipeComponent,
    EditShoppingListComponent,
    HomeComponent,
    SearchRecipeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
