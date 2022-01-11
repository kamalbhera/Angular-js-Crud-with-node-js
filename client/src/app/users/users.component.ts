import { Component, OnInit } from '@angular/core';
import { UserService} from '../services/user.crud';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  Users:any = [];

  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.userService.GetUsers().subscribe(res => {
      console.log(res);
      this.Users =res;
    })
  }

  delete(id: string, i: number): void{
    this.userService.Delete(id).subscribe(res => {
      this.Users.splice(i, 1)
    })
  }

}
