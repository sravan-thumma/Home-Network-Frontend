import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { user } from '../user';
import { UserListComponent } from '../user-list/user-list.component';
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
  id!: number;
  user!: user;
  role!:any;
  constructor(
    private userservice: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.user = new user();
    this.role=sessionStorage.getItem('role');
    this.id = this.route.snapshot.params['id'];
    this.userservice.getUser(this.id).subscribe(
      (data) => {
        console.log(data);
        this.user = data;
      },
      (error) => console.log(error)
    );
  }
  async updateUser() {
    await this.userservice.updateUser(this.id, this.user).toPromise().then(
      (data) => console.log(data),
      (error) => console.log(error)
    );
    this.user = new user();
    this.gottoList();
  }
  async onSubmit() {
    await this.updateUser();
  }
  gottoList() {
    this.router.navigate(['/users']);
  }
}
