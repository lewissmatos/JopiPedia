import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  
  currentQuestion: QuestionModel[] = []
  currentResps: Resp[] = []

  getLink() {
    return this.activatedRouter.snapshot.params.id
  }
  
  ngOnInit(): void {
  }
  
  btnColor:any = ''
  i = 0  
  finish = false

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
      
  points: number = 0
  
  
 

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
      }
    )
  }

  clicked= false

  correctQuestion: any
  incorrectQuestion: any


  qv : any

  selectedQuestion(resp: any, index: any){
    this.clicked = true
   
    this.qv = resp
    
    if (resp.correcta === true) {
      this.correctQuestion = true
      this.points += 5
    }
    else if(resp.correcta === false){
      this.incorrectQuestion = true
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

  /* previousQ() {
    this.clicked = true
    this.correctQuestion = this.qv
    this.i = this.i- 1
    this.currentResps = this.currentQuestion[this.i].respuestas
  } */


  themeFinished(){
          
    Swal.fire({
      icon: 'success',
      title: 'Tema finalizado',
      html: `<p>Haz finalizado este tema.</p> <h5 class="text-success">Tu puntuación es: ${this.points}</h5>`,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ir al inicio'
    }).then(x=>{
      if (x.isConfirmed) {
        this.router.navigate(['/dashboard/home'])
      }
    })
    
  }

  nextQ() {
    this.i = this.i + 1
    console.log(this.i)
    this.currentResps = this.currentQuestion[this.i].respuestas
    this.currentResps = this.currentResps.sort((a, b) => 0.5 - Math.random())
    this.clicked = false
    this.correctQuestion = false
    this.incorrectQuestion = false

    if (this.i == 18) {
      this.finish = true
    }
    if (this.i == 19) {
      this.themeFinished()
    }

  }
  
  pregProvisional: QuestionModel[] = []
  getAllQuestionsByTheme() {
    this.pService.getPreguntaByTemaId(this.getLink())
      .subscribe(
        async (res) => {
          this.pregProvisional = res.data
          this.pregProvisional = await Promise.all(this.pregProvisional.sort((a, b) => 0.5 - Math.random()))
          console.log(this.pregProvisional)
          for (let i = 0; i < 20; i++) {
            this.currentQuestion.push(this.pregProvisional[i])
          }

          this.currentResps = this.currentQuestion[this.i].respuestas
          this.currentResps = this.currentResps.sort((a, b) => 0.5 - Math.random())
        }
    )
  }
  
}
