import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ServerurlService {

  constructor(private http:HttpClient) { }
  private httpOptions = {
    headers:new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    withCredentials: true
  };
 async getUrl(){
    var url='';
    if (environment.production) {
      console.log('Build mode: Production');
      url=environment.apiUrl+'/angularurl.php';
    } else {
      console.log('Build mode: Development');
      url='/api'+'/angularurl.php';
    }
    await this.http.get(url,this.httpOptions).toPromise().then((data:any)=>
    {
      console.log('Request successful:', data);
      if(data['status']==='0'){  // 0 is True & 1 is False
        sessionStorage.setItem('currentDomain',data['url']);   
        return true;
      }else{
        sessionStorage.setItem('currentDomain', 'http://localhost:8080');
        return true;
      }
    }).catch((error:HttpErrorResponse)=>{
      console.log('Failed',error.status);
      sessionStorage.setItem('currentDomain', 'http://localhost:8080');
      return true;
    })
  }
}
