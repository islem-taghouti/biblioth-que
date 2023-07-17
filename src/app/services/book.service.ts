import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private _http:HttpClient) { }
  addBook(data: any) :Observable<any>{
    return this._http.post('http://localhost:8082/customers/add',data);
  }
  getBooks():Observable<any> {
    return this._http.get('http://localhost:8082/customers')
  }
  getBook(id:number):Observable<any> {
    return this._http.get(`http://localhost:8082/customers/${id}`)
  }
  deleteBook(id: number): Observable<any> {
    return this._http.delete(`http://localhost:8082/customers/delete/${id}`);
  }
  editBook(id: number,data:any): Observable<any> {
    return this._http.put(`http://localhost:8082/customers/edit/${id}`, data);
  }
  
  

}
