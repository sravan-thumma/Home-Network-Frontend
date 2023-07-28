import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Home Network';
  constructor(private router:Router,private bnIdle:BnNgIdleService){}
  ngOnInit(): void{
    this.bnIdle.startWatching(600).subscribe((res) => {
      if(res) {
        console.log("Session Expired");
        sessionStorage.removeItem("currentUser");
        this.router.navigate(['']);
      }
    });
  }
}

