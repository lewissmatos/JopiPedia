import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { cardData } from '../../Models/cardData.model';
import { ThemesService } from '../../services/themes.service';

import Swal from 'sweetalert2'
import { AdminPreguntaService } from 'src/app/admin/services/admin-pregunta.service';
import { QuestionModel, Resp } from 'src/app/admin/Models/Question.model';
import { ScoreService } from '../../services/score.service';
import { UserServicesService } from '../../services/user-services.service';
import { User } from 'src/app/auth/Models/user.model';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  currentTheme: cardData = {
    _id: '',
    bgColor: '#FFF',
    title: '',
    desc: '',
  }

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
    private activatedRouter: ActivatedRoute, 
    private router: Router, 
    private tService: ThemesService, 
    private pService: AdminPreguntaService,
    private scoreService: ScoreService,
    private userService: UserServicesService
  ) {
    this.getThemeById()
    this.getAllQuestionsByTheme()
    //this.getHighestUser()
    this.getUserInfo()
  }

  i = 0  

  currentQuestion: QuestionModel[] = []
  currentResps: Resp[] = []

  getLink() {
    return this.activatedRouter.snapshot.params.id
  }
  
  ngOnInit(): void {

  }

  btnColor:any = ''

  getThemeById() {
    return this.tService.getThemeById(this.getLink())    
      .subscribe(
        res => {
          this.charg = false
          this.currentTheme = res.data
          this.getHighestUser()
          this.btnColor = this.currentTheme.bgColor
        },
        error => {
          console.log(error)
          Swal.fire({
            title: 'ERROR',
            text: "ha ocurrido un error al cargar el test",
            icon: 'error',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',     
            confirmButtonText: 'Aceptar'
          })
        }
      )
  }

  allhighestScores = []
  
  sameTheme: any = {}
  user: User = {}
  score = {}

  getHighestUser(){
    this.scoreService.getHighestScores().subscribe(
      res => {
        this.championLoad = false
        this.allhighestScores = res.data
        this.sameTheme = this.allhighestScores.find((x:any)=> x.tema.title === this.currentTheme.title)
        this.user = this.sameTheme.scores[0].user
        this.score = this.sameTheme.scores[0].score
        console.log(this.score)
        console.log(this.sameTheme)
      }
    )
  }

  correctQuestion: any

  selectedQuestion(resp: any){
    console.log(resp)
    if (resp.correcta) {
      this.correctQuestion = true
    }else{
      this.correctQuestion = false
    }
  }

  championLoad = true

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

  previousQ() {
    this.i = this.i- 1
    this.currentResps = this.currentQuestion[this.i].respuestas
  }

  nextQ() {
    this.i = this.i + 1
    this.currentResps = this.currentQuestion[this.i].respuestas
  }
  
  getAllQuestionsByTheme() {
    this.pService.getPreguntaByTemaId(this.getLink())
      .subscribe(
        res => {
          this.currentQuestion = res.data
          this.currentResps = this.currentQuestion[this.i].respuestas
        }
    )
  }
  
  

}
