import { UserServicesService } from './../../services/user-services.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/Models/user.model';

@Component({
  selector: 'app-search-people',
  templateUrl: './search-people.component.html',
  styleUrls: ['./search-people.component.scss']
})
export class SearchPeopleComponent implements OnInit {

  allUsers: any[] = []
  usersFiltered: any[] = []

  fotito: any = '../../../../assets/user-profile.png'

  currentUser: User = { name: '', lName: '' }
  userLogged: User = { name: '', lName: '' }
  isOtherProfile: boolean = false
  userNotFound: boolean = false
  username: string = ''


  charg = true
  constructor(
    private userService: UserServicesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUsers()
    this.getUserInfo()
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


  getUserInfo() {
    this.userService.getUserInfo().subscribe(
      res => {
        if (this.isOtherProfile) {
          this.userLogged = res.user          
        }
        else {
          this.currentUser = res.user          
        }
      },
      error => console.log(error)
    )
  }


  visit(username: any) {
    if (this.currentUser.user == username) {
      this.router.navigate(['/dashboard/profile'])
    }else
    this.username = username
    this.isOtherProfile = true
  }

  obs = false
  
  search(uN: string = '') {
    this.usersFiltered = this.allUsers.filter((x:any) => x.user!.toLowerCase().includes(uN.toLowerCase()))
    if (uN.length > 0) {
      this.obs = true
    }
  }

}
