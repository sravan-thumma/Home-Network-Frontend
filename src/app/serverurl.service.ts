import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import {Inject} from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ServerurlService {
  constructor(@Inject(DOCUMENT) private document:any,private http:HttpClient) { 
  }
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
    console.log(this.document.location.hostname+':'+this.document.location.port);
    console.log(this.document.location.protocol);
    await this.http.get(url,this.httpOptions).toPromise().then((data:any)=>
    {
      console.log('Request successful:', data);
      if(data['status']==='0'){  // 0 is True & 1 is False
        sessionStorage.setItem('currentDomain',data['url']);   
        return true;
      }else{
        if(this.document.location.port==='4200'){
          console.log("If 4200"+this.document.location.protocol+'\\\\'+this.document.location.hostname+':'+8080);
          sessionStorage.setItem('currentDomain',this.document.location.protocol+'\\\\'+this.document.location.hostname+':'+8080);
        }else{
          if(this.document.location.port==='80'){
            console.log("If 80"+this.document.location.protocol+'\\\\'+this.document.location.hostname);
            sessionStorage.setItem('currentDomain',this.document.location.protocol+'\\\\'+this.document.location.hostname);
          }else{
            console.log("Other ports "+this.document.location.protocol+'\\\\'+this.document.location.hostname+':'+this.document.location.port);
            sessionStorage.setItem('currentDomain',this.document.location.protocol+'\\\\'+this.document.location.hostname+':'+this.document.location.port);
          }
        //sessionStorage.setItem('currentDomain', 'http://localhost:8080');
        }
        return true;
      }
    }).catch((error:HttpErrorResponse)=>{
      console.log('Failed',error.status);
      if(this.document.location.port==='4200'){
        console.log("Error 4200"+this.document.location.protocol+'\\\\'+this.document.location.hostname+':'+8080);
        sessionStorage.setItem('currentDomain',this.document.location.protocol+'\\\\'+this.document.location.hostname+':'+8080);
      }else{
        if(this.document.location.port==='80'){
          console.log("Error 80"+this.document.location.protocol+'\\\\'+this.document.location.hostname);
          sessionStorage.setItem('currentDomain',this.document.location.protocol+'\\\\'+this.document.location.hostname);
        }else{
          console.log("Error Other ports "+this.document.location.protocol+'\\\\'+this.document.location.hostname+':'+this.document.location.port);
          sessionStorage.setItem('currentDomain',this.document.location.protocol+'\\\\'+this.document.location.hostname+':'+this.document.location.port);
        }
      }
      //sessionStorage.setItem('currentDomain', 'http://localhost:8080');
      return true;
    })
  }
}
