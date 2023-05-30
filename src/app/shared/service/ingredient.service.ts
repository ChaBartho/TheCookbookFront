import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Aliment, Ingredient } from '../model/cookbook';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  private apiUrl = 'http://localhost:8080/ingredient';

  constructor(private _http: HttpClient) { }

  addIngredient(ingredient: Ingredient): Observable<Ingredient> {
    return this._http.post<Ingredient>(`${this.apiUrl}/add`, ingredient);
  }

  getIngredient(id: number): Observable<Ingredient> {
    return this._http.get<Ingredient>(`${this.apiUrl}/${id}`);
  }

  getAllIngredients(): Observable<Ingredient[]> {
    return this._http.get<Ingredient[]>(`${this.apiUrl}/all`);
  }

  deleteIngredient(id: number): Observable<any> {
    return this._http.delete(`${this.apiUrl}/delete/${id}`);
  }

  updateIngredient(id: number, ingredient: Ingredient): Observable<any> {
    return this._http.patch(`${this.apiUrl}/${id}/update`, ingredient);
  }

  clearIngredients(): Observable<Ingredient[]> {
    return this._http.delete<Ingredient[]>(`${this.apiUrl}`)
  }


  searchIngredientByName(name: string): Observable<Ingredient>{
    return this._http.get<Ingredient>(`${this.apiUrl}/name/${name}`)
  }

}
