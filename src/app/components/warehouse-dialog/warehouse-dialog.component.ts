import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-warehouse-dialog',
  templateUrl: './warehouse-dialog.component.html',
  styleUrls: ['./warehouse-dialog.component.scss']
})
export class WarehouseDialogComponent implements OnInit {
  
  constructor(
    public dialogRef: MatDialogRef<WarehouseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any, private warehouseService: WarehouseService) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
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
