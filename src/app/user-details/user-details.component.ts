import { Component,Input,OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UserListComponent } from '../user-list/user-list.component';
import { Router,ActivatedRoute } from '@angular/router';
import { user } from '../user';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit{
  id!:number;
  user!:user;
  constructor(private userservice:UserService,private router:Router,private route:ActivatedRoute){}
    ngOnInit(): void {
        this.user=new user();
        this.id = this.route.snapshot.params['id'];
        this.userservice.getUser(this.id)
        .subscribe(data => {
          console.log(data)
          this.user = data;
        }, error => console.log(error));
    }
    list(){
      this.router.navigate(['users']);
    }
}
