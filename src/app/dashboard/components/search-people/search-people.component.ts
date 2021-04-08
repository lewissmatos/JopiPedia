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

  fotito: any = '../../../../assets/user-profile.png'
  
  charg = true
  constructor(
    private userService: UserServicesService
  ) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
    this.userService.getAllUsers().subscribe(
      res => {
        this.charg = false
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
