import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Document } from '../models/document';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http: HttpClient) { }
  
  getAll(){
    return this.http.get<Document[]>('http://localhost:8081/document');
  }
  create(newDocument : Document){
    return this.http.post<Document>('http://localhost:8081/document',newDocument);
  }
}
