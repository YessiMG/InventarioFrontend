import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movement } from '../models/movement';

@Injectable({
  providedIn: 'root'
})
export class MovementService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<Movement[]>('http://localhost:8081/movement');
  }
}
