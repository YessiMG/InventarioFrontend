import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material-module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductManagementComponent } from './components/product-management/product-management.component';
import { ProductDialogComponent } from './components/product-dialog/product-dialog.component';
import { TypeProductDialogComponent } from './components/type-product-dialog/type-product-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MovementManagementComponent } from './components/movement-management/movement-management.component';
import { MovementDialogComponent } from './components/movement-dialog/movement-dialog.component';
import { WarehouseManagementComponent } from './components/warehouse-management/warehouse-management.component';
import { WarehouseDialogComponent } from './components/warehouse-dialog/warehouse-dialog.component';
import { ListProductDialogComponent } from './components/list-product-dialog/list-product-dialog.component';
import { HomeMenuComponent } from './components/home-menu/home-menu.component';
import { PowerBiViewComponent } from './components/power-bi-view/power-bi-view.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductManagementComponent,
    ProductDialogComponent,
    TypeProductDialogComponent,
    ConfirmationDialogComponent,
    MovementManagementComponent,
    MovementDialogComponent,
    WarehouseManagementComponent,
    WarehouseDialogComponent,
    ListProductDialogComponent,
    HomeMenuComponent,
    PowerBiViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
