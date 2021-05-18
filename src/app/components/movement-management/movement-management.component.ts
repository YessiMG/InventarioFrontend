import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Movement } from 'src/app/models/movement';
import { Product } from 'src/app/models/product';
import { MovementService } from 'src/app/services/movement.service';
import { ProductService } from 'src/app/services/product.service';
import { MovementDialogComponent } from '../movement-dialog/movement-dialog.component';

@Component({
  selector: 'app-movement-management',
  templateUrl: './movement-management.component.html',
  styleUrls: ['./movement-management.component.scss']
})
export class MovementManagementComponent implements OnInit {

  displayedColumns: string[] = ['idDoc', 'dateDoc', 'nameMovement', 'product', 'warehouse', 'quantityMovement', 'valueMovement', 'person'];

  dataSource = new MatTableDataSource<Movement>();
  movement: Movement[];

  newMovement : Movement = {} as Movement;
  product: Product = {} as Product;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, private movementService: MovementService, 
              private productService: ProductService,
              private route: ActivatedRoute) { 
    
  }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    const idProduct = this.route.snapshot.params['id'];
    const data = await this.movementService.getAll().toPromise();
    if (idProduct) {
      this.product= await this.productService.getById(idProduct).toPromise().then((product) => product);
      this.movement = data.filter(
        (product) => product.product.id == idProduct
      );
    } else {
      this.movement = data;
    }
    this.dataSource = new MatTableDataSource<Movement>(this.movement);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openDialogCreate(): void {
    const dialogRef = this.dialog.open(MovementDialogComponent, {
      width: '80%',
      data: this.newMovement
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
        this.dataSource.data = this.dataSource.data.concat(result);
      }
    });
  }

}
