import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { user } from '../user';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users!: Observable<user[]>;
  user!: user;
  role!:any;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.reloadData();
    this.role=sessionStorage.getItem('role');
  }
  reloadData() {
    this.users=this.userService.getUsersList();
    /*.subscribe(
      (data)=>{
        this.users=data;
      },(error)=>{
        console.log(error);
      }
    )*/
  }
  userDetails(id: number) {
    this.router.navigate(['details', id]);
  }
  updateDetails(id: number) {
    this.router.navigate(['update', id]);
  }
  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(
      (data) => {
        console.log(data);
        this.reloadData();
      },
      (error) => console.log(error)
    );
  }
  loginAsUser(id:number){
    this.userService.getUser(id).subscribe(
      (data) => {
        this.user = new user();
        console.log(data);
        this.user = data;
        sessionStorage.setItem('currentUser', data.username);
        //sessionStorage.setItem('role', data.role); //Not Changing the Login Role
        sessionStorage.setItem('userid', data.id);

      },
      (error) => console.log(error)
    );
    this.gottoList(id);
  }
  gottoList(id: number) {
    //this.router.navigate(['/transactions']);
    this.router.navigate(['transactions', { User:id}]);
  }
}
