import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypeMovement } from '../models/type-movement';

@Injectable({
  providedIn: 'root'
})
export class TypeMovementService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<TypeMovement[]>("http://localhost:8081/type_movement");
  }
}
