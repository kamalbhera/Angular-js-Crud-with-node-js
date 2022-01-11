import { Component, NgZone, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.crud';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  getId: any;
  updateForm: FormGroup;

  constructor(public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private userService: UserService) {

      this.getId = this.activatedRoute.snapshot.paramMap.get('id');

      this.userService.Edit(this.getId).subscribe(res => {
        this.updateForm.setValue({
          name: res['name'],
          email: res['email'],
          post: res['post'],
          password: res['password'],
        });
      });

    this.updateForm = this.formBuilder.group({
      name: [''],
      email: [''],
      post: [''],
      password: ['']
    });

   }

  ngOnInit(): void {
  }

  onUpdate():void {
    this.userService.Update(this.updateForm.value, this.getId)
    .subscribe(() => {
      console.log('Data has benn updated');
      this.ngZone.run(()=> this.router.navigateByUrl('users'));
    }, (err) => {
      console.log(err)
    })
    console.log(this.updateForm.value)
  }
}
