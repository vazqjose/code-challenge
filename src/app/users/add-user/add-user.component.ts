import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  /*
    new formgroup instance for adding user data
  */
  addUserForm: FormGroup = new FormGroup({});

  /*
    create instance of user service and snackbar material component
  */
  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private _snackBar: MatSnackBar) {}

  /*
    set our form data components
  */
  ngOnInit(): void {
    this.addUserForm = this.formBuilder.group({
      'username': new FormControl(''),
      'email': new FormControl(''),
      'phone': new FormControl('')
    })
  }

  /*
    call addUser method in user service, send form objects.  if post method
    was successful or not, inform the user with a popup message
  */
  createUser() {
    this.userService.addUser(this.addUserForm.value).subscribe(data => {
        this._snackBar.open("User created successfully")
    }, err => {
      this._snackBar.open("Could not create user");
    });
  }

}
