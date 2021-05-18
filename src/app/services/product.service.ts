import { HttpClient, HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { ProductQuantity } from '../models/product-quantity';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Product[]>('http://localhost:8081/product');
  }

  getById (id) {
    return this.http.get<Product>(`http://localhost:8081/product/${id}`);
  }

  create(newProduct : Product){
    return this.http.post<Product>('http://localhost:8081/product',newProduct);
  }
  edit(product: Product){
    return this.http.put<Product>("http://localhost:8081/product",product);
  }
  delete(product: Product){
    return this.http.request('delete', "http://localhost:8081/product", {body: product});
  }
  getByWarehouse(idWarehouse: number){
    return this.http.get<ProductQuantity[]>(`http://localhost:8081/product/warehouse/${idWarehouse}`);
  }
}
