import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Warehouse } from 'src/app/models/warehouse';
import { WarehouseService } from 'src/app/services/warehouse.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ListProductDialogComponent } from '../list-product-dialog/list-product-dialog.component';
import { WarehouseDialogComponent } from '../warehouse-dialog/warehouse-dialog.component';

@Component({
  selector: 'app-warehouse-management',
  templateUrl: './warehouse-management.component.html',
  styleUrls: ['./warehouse-management.component.scss']
})
export class WarehouseManagementComponent implements OnInit {

  displayedColumns: string[] = ['name', 'actions'];

  dataSource = new MatTableDataSource<Warehouse>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public warehouseService: WarehouseService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    const data = await this.warehouseService.getAll().toPromise();
    this.dataSource = new MatTableDataSource<Warehouse>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openDialogCreate(){
    const dialogRef = this.dialog.open(WarehouseDialogComponent, {
      width: '80%',
      data: {} as Warehouse
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
        this.dataSource.data = [...this.dataSource.data, result];
      }
    });
  }

  openProducts(element){
    const dialogRef = this.dialog.open(ListProductDialogComponent, {
      data: element
    });
  }

  openDialogEdit(element){
    const copy = {...element};
    const dialogRef = this.dialog.open(WarehouseDialogComponent, {
      width: '80%',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
        this.dataSource.data = this.dataSource.data.map(d=> d.id === result.id? result : d);
      } else {
        this.dataSource.data = this.dataSource.data.map(d=> d.id === copy.id? copy : d);
      }
    });
  }

  openConfirmationDialog(warehouse){
    const message = "¿Esta seguro de eliminar el almacén?";
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: message
    });

    dialogRef.afterClosed().subscribe((confirmed: Boolean) => {
      if(confirmed){
        this.warehouseService.delete(warehouse).toPromise().then(result => {
          if(result){
            this.dataSource.data = this.dataSource.data.filter(item => item !== warehouse);
          }
        });
      }
    });
  }

}
