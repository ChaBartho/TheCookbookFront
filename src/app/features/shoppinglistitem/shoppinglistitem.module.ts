import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppinglistitemRoutingModule } from './shoppinglistitem-routing.module';
import { ShoppinglistitemComponent } from './shoppinglistitem.component';


@NgModule({
  declarations: [
    ShoppinglistitemComponent
  ],
  imports: [
    CommonModule,
    ShoppinglistitemRoutingModule
  ]
})
export class ShoppinglistitemModule { }
