import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypeDocument } from '../models/type-document';

@Injectable({
  providedIn: 'root'
})
export class TypeDocumentService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<TypeDocument[]>('http://localhost:8081/type_document');  
  }
}
