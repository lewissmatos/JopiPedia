import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/Models/user.model';
import { cardData } from '../../Models/cardData.model';
import { ScoreService } from '../../services/score.service';
import { ThemesService } from '../../services/themes.service';
import { UserServicesService } from '../../services/user-services.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {

  dataFiltered: any[] = []

  
  currentUser: User = { name: '', lName: '' }
  userLogged: User = { name: '', lName: '' }
  isOtherProfile: boolean = false
  userNotFound: boolean = false
  username: string = ''

  constructor(
    private scoreService: ScoreService,
    private userService: UserServicesService,
    private router: Router
              ) {
    this.getHighestScores()
    this.getUserInfo()
  }

  ngOnInit(): void {
  }
  
  charg = true
  
  highestScores: any[] = []

  getHighestScores(){
    return this.scoreService.getHighestScores()
    .subscribe(
      res => {
        this.charg = false
        this.highestScores = res.data
      }, error => console.log(error)
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
          console.log(this.currentUser)
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
    console.log(this.currentUser.user)
    console.log(username)
  }
    
  obs = false
  search = (title: string) => {
    this.dataFiltered = this.highestScores.filter((x: any) => x.tema.title?.toLowerCase().includes(title.toLowerCase()))     
    if (title.length > 0) {
      this.obs = true
    }

  }
}
