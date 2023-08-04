import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { user } from './user';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://192.168.0.108:8080/home/v1/users';
  private loginUrl = 'http://192.168.0.108:8080/home/v1/userlogin';

  constructor(private http: HttpClient) {}
  getUser(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  getUsersList(): Observable<any> {
    console.log(this.http.get(`${this.baseUrl}`));
    return this.http.get(`${this.baseUrl}`);
  }
  updateUser(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
  createUser(user: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, user);
  }
  userLogin(username: string, password: string): Observable<any> {
    return this.http.get(`${this.loginUrl}/${username}&${password}`);
  }
}
