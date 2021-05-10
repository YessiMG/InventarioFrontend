import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
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

  openDialogCreate(): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '80%',
      data: this.newProduct
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result != undefined){
        this.dataSource.data = [...this.dataSource.data, result];
      }
    });
  }

  openDialogEdit(product): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '80%',
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result) {
        this.dataSource.data.forEach(item =>{
          if(item.id == result.id){
            item.brand = result.brand;
            item.type = result.type;
          }
        });
      }
    });
  }

  openConfirmationDialog(product): void {
    const message = "¿Esta seguro de eliminar el producto?";
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: message
    });

    dialogRef.afterClosed().subscribe((confirmed: Boolean) => {
      if(confirmed){
        this.productService.delete(product).toPromise().then(result => {
          if(result){
            this.dataSource.data = this.dataSource.data.filter(item => item !== product);
          }
        });
      }
    });
  }

}


