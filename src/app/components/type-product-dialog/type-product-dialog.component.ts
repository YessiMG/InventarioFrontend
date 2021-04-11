import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TypeOperation } from 'src/app/models/type-operation.enum';
import { TypeProduct } from 'src/app/models/type-product';
import { BrandService } from 'src/app/services/brand.service';
import { TypeProductService } from 'src/app/services/type-product.service';


@Component({
  selector: 'app-type-product-dialog',
  templateUrl: './type-product-dialog.component.html',
  styleUrls: ['./type-product-dialog.component.scss']
})
export class TypeProductDialogComponent implements OnInit {
  
  constructor(
    public dialogRef: MatDialogRef<TypeProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any, private typeProductService: TypeProductService, private brandService: BrandService) { }



  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(flag: number): void {
    if (flag == TypeOperation.typeProduct) {
      if (this.typeProductService) {
        this.typeProductService.create(this.data).toPromise().then(result => {
          this.dialogRef.close(result);
        });
      }
    }
    else if(flag == TypeOperation.brand){
      if(this.brandService){
        this.brandService.create(this.data).toPromise().then(result => {
          this.dialogRef.close(result);
        });
      }
    }
  }

}
