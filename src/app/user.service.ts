import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { user } from './user';
import { ServerurlService } from './serverurl.service';
import { OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class UserService{
  private domain:any;
  baseUrl!:string;
  loginUrl!:string;
  public httpOptions = {
    headers:new HttpHeaders({
      'Content-Type': 'application/json',
      //'Cookie':'__test=ae5c50926771a64dab0ff5eb1ff9e451; expires=2023-08-21T17:16:34.847Z; path=/',
    }),
    withCredentials: true
  };
  constructor(private serverService:ServerurlService,private http: HttpClient) {
    this.geturl();
    console.log('TRRR');
  }

  getUser(id: number): Observable<any> {
    return this.http.get(`${sessionStorage.getItem('baseUrl')}/${id}`,this.httpOptions);
  }
  getUsersList(): Observable<any> {
    console.log(this.baseUrl);
    return this.http.get(`${sessionStorage.getItem('baseUrl')}`,this.httpOptions);
  }
  updateUser(id: number, value: any): Observable<Object> {
    return this.http.post(`${sessionStorage.getItem('baseUrl')}/${id}`, value,this.httpOptions);
  }
  deleteUser(id: number): Observable<any> {
    return this.http.get(`${sessionStorage.getItem('baseUrl')}/delete/${id}`,this.httpOptions);
  }
  createUser(user: Object): Observable<Object> {
    return this.http.post(`${sessionStorage.getItem('baseUrl')}`, user,this.httpOptions);
  }
  userLogin(username: string, password: string): Observable<any> {
    console.log(this.loginUrl);
    return this.http.get(`${sessionStorage.getItem('loginUrl')}/${username}&${password}`,this.httpOptions);
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
