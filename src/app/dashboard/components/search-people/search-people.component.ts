import { User } from './../../../auth/Models/user.model';
import { UserServicesService } from './../../services/user-services.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-people',
  templateUrl: './search-people.component.html',
  styleUrls: ['./search-people.component.scss']
})
export class SearchPeopleComponent implements OnInit {

  allUsers: any[] = []
  usersFiltered: any[] = []
  
  constructor(
    private userService: UserServicesService
  ) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
    this.userService.getAllUsers().subscribe(
      res => {
        this.allUsers = res.users.filter((x: any) => x.isAdmin === false)
        console.log(this.allUsers)
      },
      error => {
        console.log(error)
      }
    )
  }

  obs = false
  search(userName: string) {
    this.usersFiltered = this.allUsers.filter((x:any) => x.user?.toLowerCase().includes(userName.toLowerCase()))
    if (userName.length > 0) {
      this.obs = true
    }
  }
}
