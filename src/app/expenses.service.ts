import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { transaction } from './transaction';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  private domain=sessionStorage.getItem('currentDomain');
  private baseUrl = this.domain+'/home/v1/transactions';
  public httpOptions = {
    headers:new HttpHeaders({
      'Content-Type': 'application/json',
      //'Cookie':'__test=ae5c50926771a64dab0ff5eb1ff9e451; expires=2023-08-21T17:16:34.847Z; path=/',
    }),
    withCredentials: true
  };
  constructor(private http: HttpClient) {
    console.log('TTTTTT');
  }
  getTransaction(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  getTransactionByUserId(user_id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/userid=${user_id}`,this.httpOptions);
  }
  //getTransactionByUserId(user_id:number):Observable<any>{
  //  return this.http.get(`${this.baseUrl}/userid=${user_id}`);
  //}
  getTransactionByDates(
    startdate: any,
    enddate: any,
    user_id: number
  ): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/${startdate}/${enddate}/${user_id}`,this.httpOptions
    );
  }
  getTransactionsList(): Observable<any> {
    console.log(this.http.get(`${this.baseUrl}`,this.httpOptions));
    return this.http.get(`${this.baseUrl}`);
  }
  updateTransaction(id: string, value: any): Observable<Object> {
    return this.http.post(`${this.baseUrl}/${id}`, value,this.httpOptions);
  }
  deleteTransaction(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/delete/${id}`,this.httpOptions);
  }
  createTransaction(transaction: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, transaction,this.httpOptions);
  }
}
