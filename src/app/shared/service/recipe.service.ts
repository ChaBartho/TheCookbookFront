import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingredient, Recipe } from '../model/cookbook';
import { env } from 'src/env';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private apiUrl = `http://${env.apihost}:8080/recipe`;

  constructor(private _http: HttpClient) { }

  addRecipe(recipe: Recipe): Observable<Recipe> {
    return this._http.post<Recipe>(`${this.apiUrl}/add`, recipe);
  }
  getOneRecipe(id: number): Observable<Recipe> {
    return this._http.get<Recipe>(`${this.apiUrl}/${id}`);
  }
  getAllRecipes(): Observable<Recipe[]> {
    return this._http.get<Recipe[]>(`${this.apiUrl}/all`);
  }
  deleteRecipe(id: number): Observable<any> {
    return this._http.delete(`${this.apiUrl}/${id}/delete`);
  }
  updateRecipe(id: number, recipe: Recipe): Observable<any> {
    return this._http.patch(`${this.apiUrl}/${id}/update`, recipe);
  }
  clearRecipes(): Observable<Recipe[]> {
    return this._http.delete<Recipe[]>(`${this.apiUrl}`)
  }

  getIngredientsByRecipe(id: number): Observable<Ingredient[]> {
    return this._http.get<Ingredient[]>(`${this.apiUrl}/${id}/ingredients`);
  }
  searchRecipeByName(name: string): Observable <Recipe>{
    return this._http.get<Recipe>(`${this.apiUrl}/name/${name}`)
  }

}
