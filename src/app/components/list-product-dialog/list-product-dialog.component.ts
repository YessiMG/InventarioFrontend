import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/models/product';
import { ProductQuantity } from 'src/app/models/product-quantity';
import { ProductService } from 'src/app/services/product.service';
import { WarehouseDialogComponent } from '../warehouse-dialog/warehouse-dialog.component';

@Component({
  selector: 'app-list-product-dialog',
  templateUrl: './list-product-dialog.component.html',
  styleUrls: ['./list-product-dialog.component.scss']
})
export class ListProductDialogComponent implements OnInit {

  products: Product[] = [];
  productQuantities: ProductQuantity[];

  constructor(private productService: ProductService, 
    public dialogRef: MatDialogRef<WarehouseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data : number) { }

  async ngOnInit() {
    this.products = await this.productService.getAll().toPromise();
    this.productQuantities = await this.productService.getByWarehouse(this.data).toPromise();
    this.productQuantities = this.productQuantities.map(pq=>{
      const product = this.products.find(p=>p.id === pq.id);
      pq.name = product.name + " " + product.brand.name + " " + product.description;
      return pq;
    });
  }

}
