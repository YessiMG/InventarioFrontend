import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Movement } from 'src/app/models/movement';
import { Product } from 'src/app/models/product';
import { MovementService } from 'src/app/services/movement.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-movement-management',
  templateUrl: './movement-management.component.html',
  styleUrls: ['./movement-management.component.scss']
})
export class MovementManagementComponent implements OnInit {

  displayedColumns: string[] = ['idDoc', 'dateDoc', 'nameMovement', 'quantityMovement', 'valueMovement', 'person'];

  dataSource = new MatTableDataSource<Movement>();
  movement: Movement[];
  product: Product = {} as Product;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private movementService: MovementService, 
              private productService: ProductService,
              private route: ActivatedRoute) { 
    
  }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    const idProduct = this.route.snapshot.params['id'];
    this.product= await this.productService.getById(idProduct).toPromise().then((product) => product);
        const data = await this.movementService.getAll().toPromise();
    this.movement = data.filter(
      (product) => product.product.id == idProduct
    );
    this.dataSource = new MatTableDataSource<Movement>(this.movement);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
