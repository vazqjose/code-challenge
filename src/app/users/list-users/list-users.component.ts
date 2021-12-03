import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  /*
    Create our data recipient and service of type UserService
  */
  listUsers: any;
  constructor(private userService: UserService) { }

  /*
    Call method listUsers in our service to obtain all users, use subscribe
    directive to handle observable data type
  */
  ngOnInit(): void {
    this.userService.listUsers().subscribe(data => {
        this.listUsers = data;
    });
  }

}
