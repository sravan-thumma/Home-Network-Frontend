import { user } from '../user';
import { Router,ActivatedRoute } from '@angular/router';
import { ObservableInput } from 'rxjs';
import { RouterTestingHarness } from '@angular/router/testing';
import { Component,OnInit } from '@angular/core';
import { UserService } from '../user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  username!:string;
  password!:string;
  constructor(private userservice:UserService,private router:Router,private route:ActivatedRoute){}
  ngOnInit(): void {
      /*if(localStorage.getItem("currentUser")){
        console.log(true)
        this.router.navigate(['users'])
      }else{
        console.log(false)
        this.router.navigate(['login'])
      }*/
  }
  onSubmit():void{
    let role="Admin";
    this.userservice.userLogin(this.username,this.password)
    .subscribe(data=>{
      sessionStorage.setItem("currentUser", data.username);
      sessionStorage.setItem("role",data.role);
      sessionStorage.setItem("userid",data.id);
      console.log("---------------------")
      console.log(JSON.stringify(data))
      console.log(data)
      console.log("---------------------")
      const jsonrole=data.role;
      let returnUrl;
      if(jsonrole===role){
        returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'users';
      }else{
        returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'transactions';
      }
      this.router.navigateByUrl(returnUrl);
    },error=>{
      console.log(error)
  });
  }
  
}
