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

  foto: any = '../../../../assets/user-profile.png'
  
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
      },
      error => {
        console.log(error)
      }
    )
  }

  obs = false
  
  search(uN: string = '') {
    this.usersFiltered = this.allUsers.filter((x:any) => x.user!.toLowerCase().includes(uN.toLowerCase()))
    if (uN.length > 0) {
      this.obs = true
    }
  }

  
}
