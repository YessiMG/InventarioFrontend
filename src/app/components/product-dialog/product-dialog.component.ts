import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Brand } from 'src/app/models/brand';
import { Product } from 'src/app/models/product';
import { TypeOperation } from 'src/app/models/type-operation.enum';
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

  copy: Product;
  typeProducts: TypeProduct[] = [];
  brands: Brand[] = [];

  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product, private typeProductService: TypeProductService,
    private brandService: BrandService, private productService: ProductService) {
      if(data.id == undefined){
        data.name = "";
        data.description = "";
        data.maximumPrice = 0;
        data.minimumPrice = 0;
        data.quantity = 0;
        data.vatTax = 0;
        data.consumptionTax = 0;
        data.brand = undefined;
        data.type = undefined;
      }
      if(!data.type) 
        data.type = {} as TypeProduct;
      if(!data.brand) 
        data.brand = {} as Brand;
  }

  ngOnInit(): void {
    this.loadData();
    this.copy = {...this.data};
    console.log(this.data);
  }

  async loadData() {
    this.typeProducts = await this.typeProductService.getAll().toPromise();
    this.brands = await this.brandService.getAll().toPromise();

  }


  onNoClick(): void {
    if(this.copy.id != undefined){
      this.dialogRef.close(this.copy);
    }
    this.dialogRef.close();
  }
  save(): void {
    if(this.data?.type?.id)
      this.data.type = this.typeProducts.find(t=>t.id === this.data.type.id)

    if(this.data?.brand?.id)
      this.data.brand = this.brands.find(t=>t.id === this.data.brand.id)

    if (this.data.id != undefined) {
      this.productService.edit(this.data).toPromise().then(result => {
        this.dialogRef.close(result);
      });
    }
    else{
      this.productService.create(this.data).toPromise().then(result => {
        this.dialogRef.close(result);
      });
    }
  }

  openDialogTypeProduct(): void {

    const name: string = "Tipo de Producto";
    const dialogRef = this.dialog.open(TypeProductDialogComponent, {
      width: '50%',
      data: { name: name, flag: TypeOperation.typeProduct }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('The dialog was closed' + result);
        this.typeProducts = [...this.typeProducts, result];
      }
    });
  }

  openDialogBrand(): void {

    const name: string = "Marca";
    const dialogRef = this.dialog.open(TypeProductDialogComponent, {
      width: '50%',
      data: { name: name, flag: TypeOperation.brand }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('The dialog was closed');
        this.brands = [...this.brands, result];
      }
    });
  }
}


