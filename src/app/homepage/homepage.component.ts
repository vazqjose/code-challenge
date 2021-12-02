import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http-service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  users = [] as any;
  local_users = { ...localStorage};
  user_details = "";
  my_users = [] as any;



  onAdd(user: any) {
    this.user_details = JSON.stringify({
      'id': user.id,
      'name': user.name,
      'username': user.username,
      'email': user.email,
      'phone': user.phone
    })
    localStorage.setItem(user.id, this.user_details);
    this.getLocalUsers();
  }

  getLocalUsers() {
    console.log(localStorage.getItem(this.user_details));
  }

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.getUsers()
    .subscribe( data => this.users = data);
  }
}
