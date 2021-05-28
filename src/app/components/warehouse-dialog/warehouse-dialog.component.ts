import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Warehouse } from 'src/app/models/warehouse';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-warehouse-dialog',
  templateUrl: './warehouse-dialog.component.html',
  styleUrls: ['./warehouse-dialog.component.scss']
})
export class WarehouseDialogComponent implements OnInit {
  
  copy: Warehouse;

  constructor(
    public dialogRef: MatDialogRef<WarehouseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any, private warehouseService: WarehouseService) { 
      this.copy = {...data};
    }

  ngOnInit(): void {
  }

  onNoClick(): void {
    if(this.copy.id != undefined){
      this.dialogRef.close(this.copy);
    }
    this.dialogRef.close();
  }

  save(flag: number): void {
    if (!this.data.id) {
      this.warehouseService.create(this.data).toPromise().then(result => {
          this.dialogRef.close(result);
        });
    } else {
      this.warehouseService.edit(this.data).toPromise().then(result => {
        this.dialogRef.close(result);
      });
    }
  }

}
