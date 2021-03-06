import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
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

  displayedColumns: string[] = ['name', 'brand', 'description', 'typeProduct', 'quantity', 'minimumPrice', 'maximumPrice', 'vatTax', 'consumptionTax', 'actions'];

  dataSource = new MatTableDataSource<Product>();
  newProduct : Product = {} as Product;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor (public dialog: MatDialog, private productService: ProductService, private router:Router) {}

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
    const copy = {...product};
    console.log(product);
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '80%',
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result != undefined){
        console.log("entre");
        this.dataSource.data = this.dataSource.data.map(d=> d.id === result.id? result : d);
        product.id = result.id;
      } else {
        this.dataSource.data = this.dataSource.data.map(d=> d.id === copy.id? copy : d);
        this.dataSource.data.forEach(item =>{
          if(item.id == copy.id){
            item.brand.name = copy.brand.name;
            item.type.name = copy.type.name;
          }
        }); 
      }
    });
  }

  openConfirmationDialog(product): void {
    const message = "??Esta seguro de eliminar el producto?";
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

  openMovement (idProduct) {
    console.log(idProduct)
    this.router.navigate( ['/movement', idProduct] );
  }

}


