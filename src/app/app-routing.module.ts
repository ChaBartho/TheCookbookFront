import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'core', loadChildren: () => import('./core/core.module').then(m => m.CoreModule) }, { path: 'recipe', loadChildren: () => import('./features/recipe/recipe.module').then(m => m.RecipeModule) }, { path: 'shoppinglist', loadChildren: () => import('./features/shoppinglist/shoppinglist.module').then(m => m.ShoppinglistModule) }, { path: 'home', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule) }, { path: 'shoppinglistitem', loadChildren: () => import('./features/shoppinglistitem/shoppinglistitem.module').then(m => m.ShoppinglistitemModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
