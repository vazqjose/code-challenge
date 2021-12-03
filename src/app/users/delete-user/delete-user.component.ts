import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {

  userId: string = '';

  /*
    call material modules and user service
  */
  constructor(private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private router: Router) {}

    /*
      receive user id from observable object
    */
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => {
      this.userId = data['id'];
    });

    /*
      validate if parameter is sent.  call deleteUser method in user service
      otherwise, capture and display error. then, navigate back to listed users.
    */
    if (this.userId){
      this.userService.deleteUser(this.userId).subscribe(data => {
          this._snackBar.open("User deleted");
      }, err => {
        this._snackBar.open("Error deleting user");
      })
      this.router.navigate(['users']);
    }
  }

}
