import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VirtualWarehouse } from '../models/virtual-warehouse';

@Injectable({
  providedIn: 'root'
})
export class VirtualWarehouseService {

  constructor(private http : HttpClient) { }

  getAll(){
    return this.http.get<VirtualWarehouse[]>("http://localhost:8081/virtual_warehouse");
  }
}
