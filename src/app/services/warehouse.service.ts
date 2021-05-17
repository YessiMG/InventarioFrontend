import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Warehouse } from '../models/warehouse';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<Warehouse[]>('http://localhost:8081/warehouse');
  }

  create(newWarehouse : Warehouse){
    return this.http.post<Warehouse>('http://localhost:8081/warehouse',newWarehouse);
  }

  edit(warehouse: Warehouse){
    return this.http.put<Warehouse>("http://localhost:8081/warehouse",warehouse);
  }

  delete(warehouse: Warehouse){
    return this.http.request('delete', "http://localhost:8081/warehouse", {body: warehouse});
  }
}
