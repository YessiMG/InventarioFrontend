import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brand } from '../models/brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<Brand[]>('http://localhost:8081/brand');
  }
  create(newBrand : Brand){
    return this.http.post<Brand>('http://localhost:8081/brand',newBrand);
  }
}
