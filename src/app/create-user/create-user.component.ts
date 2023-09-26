import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';
import { user } from '../user';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  user: user = new user();
  role!:any;
  submitted = false;
  constructor(private userservice: UserService, private router: Router) {}
  ngOnInit(): void {
    this.role=sessionStorage.getItem('role');
  }
  newUser() {
    this.submitted = false;
    this.user = new user();
  }
  save() {
    this.userservice.createUser(this.user).subscribe(
      (data) => console.log(data),
      (error) => console.log(error)
    );
    this.user = new user();
    this.gotoList();
  }
  onSubmit() {
    this.submitted = true;
    this.save();
  }
  gotoList() {
    this.router.navigate(['/users']);
  }
}
