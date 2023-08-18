import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { DOCUMENT } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { switchMap, timeout } from 'rxjs/operators';
import { ServerurlService } from './serverurl.service';
import { timer } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent{
  title = 'Home Network';
  constructor(@Inject(DOCUMENT) private document:any,private serverService:ServerurlService,private router: Router,private bnIdle: BnNgIdleService,private http:HttpClient) {}
  async ngOnInit() {
    document.cookie="__test=ae5c50926771a64dab0ff5eb1ff9e451; expires=2023-08-21T17:16:34.847Z; path=/; sameSite: 'None' ; Secure"
    var data= await this.serverService.getUrl();
    if(sessionStorage.getItem('currentDomain')!==null){
      this.router.navigate(['login']);
    }
    else{
      this.router.navigate(['login']);
    }
    /*console.log(this.document.location.hostname+':'+this.document.location.port);
    console.log(this.document.location.protocol);
    if(this.document.location.port==='4200'){
      sessionStorage.setItem('currentDomain',this.document.location.protocol+'\\\\'+this.document.location.hostname+':'+8080);
    }else{
      if(this.document.location.port==='80'){
        sessionStorage.setItem('currentDomain',this.document.location.protocol+'\\\\'+this.document.location.hostname);
      }else{
        sessionStorage.setItem('currentDomain',this.document.location.protocol+'\\\\'+this.document.location.hostname+':'+this.document.location.port);
      }
    }*/
    console.log('A');
    this.bnIdle.startWatching(600).subscribe((res) => {
      if (res) {
        console.log('Session Expired');
        sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('userid');
        sessionStorage.removeItem('role');
        this.router.navigate(['login']);
      }
    });
  }
  OnLogout() {
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('userid');
    sessionStorage.removeItem('role');
    this.router.navigate(['login']);
  }
}
