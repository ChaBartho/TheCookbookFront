import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppinglistRoutingModule } from './shoppinglist-routing.module';
import { ShoppinglistComponent } from './shoppinglist.component';


@NgModule({
  declarations: [
    ShoppinglistComponent
  ],
  imports: [
    CommonModule,
    ShoppinglistRoutingModule
  ]
})
export class ShoppinglistModule { }
