import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private _httpClient : HttpClient) { }

  addIngredient(){}
  getOneIngredient(){}
  getAllIngredient(){}
  deleteIngredient(){}
  updateIngredient(){}
  clear(){}

}
