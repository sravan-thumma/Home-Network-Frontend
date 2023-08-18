import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { transaction } from './transaction';
@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  private domain=sessionStorage.getItem('currentDomain');
  private baseUrl = this.domain+'/home/v1/transactions';

  constructor(private http: HttpClient) {
    console.log('TTTTTT');
  }
  getTransaction(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  getTransactionByUserId(user_id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/userid=${user_id}`);
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
      `${this.baseUrl}/${startdate}/${enddate}/${user_id}`
    );
  }
  getTransactionsList(): Observable<any> {
    console.log(this.http.get(`${this.baseUrl}`));
    return this.http.get(`${this.baseUrl}`);
  }
  updateTransaction(id: string, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }
  deleteTransaction(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
  createTransaction(transaction: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, transaction);
  }
}
