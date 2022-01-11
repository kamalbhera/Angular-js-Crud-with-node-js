import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.crud';
@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  userForm: FormGroup;

  constructor(public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private userService: UserService) {
    this.userForm = this.formBuilder.group({
       name: [''],
       email: [''],
       post: [''],
       password: ['']
    })
   }

  ngOnInit(): void {
  }
  onSubmit(): any {
    this.userService.Store(this.userForm.value)
    .subscribe(() => {
        console.log('Data added successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/users'))
      }, (err) => {
        console.log(err);
    });
  }
}
