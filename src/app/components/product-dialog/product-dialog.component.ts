import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';
import { TypeProductDialogComponent } from '../type-product-dialog/type-product-dialog.component';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit {

  animal: string;

  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    }

    ngOnInit(): void {
    }
  
  onNoClick(): void {
    this.dialogRef.close();
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
