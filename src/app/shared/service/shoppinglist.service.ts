import { HttpClient } from '@angular/common/http';
import { AlimentService } from 'src/app/shared/service/aliment.service';
import { Injectable } from '@angular/core';
import { Aliment, Ingredient, Item, ShoppingList } from '../model/cookbook';
import { Observable } from 'rxjs';
//import { env } from 'src/env';

@Injectable({
  providedIn: 'root'
})
export class ShoppinglistService {

  // items : Item[] = [];
  // aliment! : Aliment;

  // private apiUrl = 'http://localhost:8080/shoppinglist';
  // //private apiUrl = `http://${env.apihost}:8080/shoppinglist`;

  // constructor(private _http: HttpClient, private _alimentService : AlimentService) { }

  // addItem(name : string, quantity : number){
  //   let searchedItem = this.items.find(i =>i.name == name)
  //   if (searchedItem){
  //     searchedItem.quantity += quantity;
  //   }
  //   else{
  //     let newItem : Item = {
  //       name : name,
  //       quantity : quantity
  //       }
  //     this.items.push(newItem)
  //   }
  // }
  // removeItem(index : number, quantity : number){
  //   this.items[index].quantity -= quantity
  //   if (this.items[index].quantity == 0){
  //     this.items.splice(index,1)
  //   }
  // }


  // addToShopList(id : number) : Observable<ShoppingList>{
  //   let item : Item;
  //   this._alimentService.getAliment(id).subscribe(
  //     aliment => {
  //       item = { name: aliment.name };
  //       this.
  //     }
  //   )




  //   this._alimentService.getAliment(id).subscribe(
  //     aliment => {
  //       this.aliment = aliment;
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   )
  //   return this._http.post<ShoppingList>(`${this.apiUrl}/add`, id)
  // }


}
