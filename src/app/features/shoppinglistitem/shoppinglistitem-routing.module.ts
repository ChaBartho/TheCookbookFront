import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppinglistitemComponent } from './shoppinglistitem.component';

const routes: Routes = [{ path: '', component: ShoppinglistitemComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppinglistitemRoutingModule { }
