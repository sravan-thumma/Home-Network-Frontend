import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { user } from './user';
import { ServerurlService } from './serverurl.service';
import { OnInit } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class UserService{
  private domain:any;
  baseUrl!:string;
  loginUrl!:string;

  constructor(private serverService:ServerurlService,private http: HttpClient) {
    this.geturl();
    console.log('TRRR');
  }

  getUser(id: number): Observable<any> {
    return this.http.get(`${sessionStorage.getItem('baseUrl')}/${id}`);
  }
  getUsersList(): Observable<any> {
    console.log(this.baseUrl);
    return this.http.get(`${sessionStorage.getItem('baseUrl')}`);
  }
  updateUser(id: number, value: any): Observable<Object> {
    return this.http.post(`${sessionStorage.getItem('baseUrl')}/${id}`, value);
  }
  deleteUser(id: number): Observable<any> {
    return this.http.get(`${sessionStorage.getItem('baseUrl')}/delete/${id}`, { responseType: 'text' });
  }
  createUser(user: Object): Observable<Object> {
    return this.http.post(`${sessionStorage.getItem('baseUrl')}`, user);
  }
  userLogin(username: string, password: string): Observable<any> {
    console.log(this.loginUrl);
    return this.http.get(`${sessionStorage.getItem('loginUrl')}/${username}&${password}`);
  }
  async geturl(){
    var data= await this.serverService.getUrl();
    console.log('ASYNC');
    this.domain=sessionStorage.getItem('currentDomain');
    this.baseUrl=this.domain+'/home/v1/users';
    sessionStorage.setItem('baseUrl',this.baseUrl);
    this.loginUrl=this.domain+'/home/v1/userlogin';
    sessionStorage.setItem('loginUrl',this.loginUrl);
  }
}
