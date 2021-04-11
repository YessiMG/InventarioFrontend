import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent implements AfterViewInit {

  animal: string;
  name: string;

  displayedColumns: string[] = ['name', 'brand', 'description', 'typeProduct', 'quantity', 'minimumPrice', 'maximumPrice', 'vatTax', 'consumptionTax', 'actions'];

  dataSource = new MatTableDataSource<Product>();
  newProduct : Product = {} as Product;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor (public dialog: MatDialog, private productService: ProductService) {}

  ngAfterViewInit() {
    this.loadData();
  } 

  async loadData() {
    const data = await this.productService.getAll().toPromise();
    this.dataSource = new MatTableDataSource<Product>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '80%',
      data: this.newProduct
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.dataSource.data = [...this.dataSource.data, result];
    });
  }

}


