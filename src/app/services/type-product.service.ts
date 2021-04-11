import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypeProduct } from '../models/type-product';

@Injectable({
  providedIn: 'root'
})
export class TypeProductService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<TypeProduct[]>('http://localhost:8081/type_product');
  }

  create(newtypeProduct : TypeProduct){
    return this.http.post<TypeProduct>('http://localhost:8081/type_product', newtypeProduct);
  }
}
