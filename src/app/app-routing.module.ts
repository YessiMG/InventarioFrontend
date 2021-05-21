import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HomeMenuComponent } from './components/home-menu/home-menu.component';
import { MovementManagementComponent } from './components/movement-management/movement-management.component';
import { ProductManagementComponent } from './components/product-management/product-management.component';
import { WarehouseManagementComponent } from './components/warehouse-management/warehouse-management.component';

export const routes: Routes = [
  { path: 'home', component: HomeMenuComponent },
  { path: 'products', component: ProductManagementComponent },
  { path: 'movement/:id', component: MovementManagementComponent },
  { path: 'movement', component: MovementManagementComponent },
  { path: 'warehouse', component: WarehouseManagementComponent },
  { path: '', component: HomeMenuComponent, pathMatch: 'full' },
  { path: '**', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})


export class AppRoutingModule{ };
