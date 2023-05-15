import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Recipe } from '../model/cookbook';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private apiUrl = 'http://localhost:8080/recipe';

  constructor(private _http: HttpClient) { }

  addRecipe(recipe: Recipe): Observable<Recipe> {
    return this._http.post<Recipe>(`${this.apiUrl}/add`, recipe);
  }

  getRecipe(id: number): Observable<Recipe> {
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


}
