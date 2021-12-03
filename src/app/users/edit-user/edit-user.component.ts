import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  userId: any;
  userDetails: any;
  editUserForm: FormGroup = new FormGroup({});
  // Flag that will be verified before data rendering in template
  dataLoaded: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(data => {
      this.userId = data['id'];
    });

    /*
      GET the data only if the id is defined
      - use the viewUser method to load the data of the user we grabbed
    */
    if (this.userId !== ''){
      // load user details
      this.userService.viewUser(this.userId)
      .toPromise()
      .then(data => {
          this.userDetails = data;
          Object.assign(this.userDetails, data);

          // Build the edit form
          this.editUserForm = this.formBuilder.group({
            'name': new FormControl(this.userDetails.name, [Validators.required, Validators.minLength(5)]),
            'email': new FormControl(this.userDetails.email, [Validators.required, Validators.email]),
            'phone': new FormControl(this.userDetails.phone, [Validators.required, Validators.maxLength(10)])
          })

          this.dataLoaded = true;

      }).catch(err => {
        console.log(err);
      })
    }
  }

  updateUser(){
    /*
      call the user service then updateUser method, pass the id & form values.
      capture and display error message if any
    */
      this.userService.updateUser(this.userId, this.editUserForm.value)
      .subscribe(data => {
        this._snackBar.open("User updated successfully")
      }, err => {
        this._snackBar.open("Could not update user info");
      });
  }

}
