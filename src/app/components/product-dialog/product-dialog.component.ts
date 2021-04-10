import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Brand } from 'src/app/models/brand';
import { Product } from 'src/app/models/product';
import { TypeProduct } from 'src/app/models/type-product';
import { BrandService } from 'src/app/services/brand.service';
import { ProductService } from 'src/app/services/product.service';
import { TypeProductService } from 'src/app/services/type-product.service';
import { TypeProductDialogComponent } from '../type-product-dialog/type-product-dialog.component';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit {

  animal: string;
  typeProducts : TypeProduct[] = [];
  brands : Brand[] = [];
  
  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product, private typeProductService : TypeProductService, 
    private brandService : BrandService, private productService : ProductService) {
    }

    ngOnInit(): void {
      this.loadData();
    }
  
    async loadData() {
      this.typeProducts = await this.typeProductService.getAll().toPromise();
      this.brands = await this.brandService.getAll().toPromise();
    }


  onNoClick(): void {
    this.dialogRef.close();
  }
  save(): void {
    this.productService.create(this.data).toPromise().then(result => {
      this.dialogRef.close(this.data);
    });
  }

  openDialogTypeProduct(): void {
    const name: string = "Tipo de Producto";
    const dialogRef = this.dialog.open(TypeProductDialogComponent, {
      width: '50%',
      data: {name: name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  openDialogBrand(): void {
    const name: string = "Marca";
    const dialogRef = this.dialog.open(TypeProductDialogComponent, {
      width: '50%',
      data: {name: name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}

export interface DialogData {
  animal: string;
  name: string;
}
