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
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.reloadData();
  }
  reloadData() {
    this.users = this.userService.getUsersList();
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
}
