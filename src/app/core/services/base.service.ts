import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environent';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  apiUrl = environment.apiUrl
  constructor(
    private http: HttpClient
  ) { }

  post<T>( body: any ): Observable<T>{
    return this.http.post<T>(this.apiUrl , body)
  }
  get<T>(id?: string): Observable<T> {
    const url = id ? `${this.apiUrl}/${id}` : this.apiUrl; 
    return this.http.get<T>(url);
  }

  delete<T>(id: number): Observable<T>{
    return this.http.delete<T>(this.apiUrl +'/' + id)
  }
  put<T>(id: string, body: any): Observable<T> {
    return this.http.put<T>(this.apiUrl + '/' + id, body);
  }
}
