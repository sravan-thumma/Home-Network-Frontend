import { Component,OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { UserService } from '../user.service';
import { user } from '../user';
import { UserListComponent } from '../user-list/user-list.component';
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit{
  id!:number;
  user!:user;
  constructor(private userservice:UserService,private router:Router,private route:ActivatedRoute){}
 ngOnInit(): void {
     this.user=new user();
     this.id=this.route.snapshot.params['id'];
     this.userservice.getUser(this.id)
     .subscribe(data =>{
      console.log(data)
      this.user=data;
     },error=>console.log(error));
 }
 updateUser(){
  this.userservice.updateUser(this.id,this.user)
  .subscribe(data=>console.log(data),error=>console.log(error));
  this.user=new user();
  this.gottoList();
 }
 onSubmit(){
  this.updateUser();
 }
 gottoList(){
  this.router.navigate(['/users']);
 }
}
