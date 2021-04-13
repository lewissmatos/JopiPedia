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
import { CanComponentLeave } from '../../guards/unsavedrecord.guard';
import { RestrictionService } from '../../services/restriction.service';
import { Console } from 'node:console';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit, CanComponentLeave {

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
  finished: boolean = true
  username: string = ''
  
 charg = true
  constructor(
    private activatedRouter: ActivatedRoute, 
    private router: Router, 
    private tService: ThemesService, 
    private pService: AdminPreguntaService,
    private scoreService: ScoreService,
    private userService: UserServicesService,
    private restrictionService: RestrictionService
  ) {
    this.getThemeById()
    this.getAllQuestionsByTheme()
    //this.getHighestUser()
    this.getUserInfo()
    this.getScoreUserLogged()
    this.getUserLoggedRestriction()
  }

  
  currentQuestion: QuestionModel[] = []
  currentResps: Resp[] = []

  getLink() {
    return this.activatedRouter.snapshot.params.id
  }

  canLeave() {
    
    if (!this.finished) {
      return Swal.fire({
        title: 'Abandonar test',
        html: `<h6>¿Seguro que quiere salir?</h6>
        <h5> su nueva puntuaión será: <h3 class="text-danger">${this.points}</h3></h5>`,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#17a2b8',
        cancelButtonColor: '#FF7952',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Aceptar'
      }).then(res => {
        if (res.isConfirmed) {
          this.saveScore()
          return res.isConfirmed
        }
        else {
          return false
        }
      })
    }
    return true
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
            confirmButtonColor: '#17a2b8',     
            confirmButtonText: 'Aceptar'
          })
        }
        )
  }
      
  points: number = 0
  fails: number = 100
  
    allhighestScores = []
    
    sameTheme: any = {}
    user: User = {}
    score = {}
      
    noChamp = false
  getHighestUser(){
    this.scoreService.getHighestScores().subscribe(
      res => {
        this.championLoad = false
        this.allhighestScores = res.data
        this.sameTheme = this.allhighestScores.find((x:any)=> x.tema.title === this.currentTheme.title)
                
        if (this.sameTheme == undefined) {
          this.noChamp = true
        }
        
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
      this.fails = this.fails - 5
    }
  }

  playing = false

  play(){
    this.finished = false
    this.playing = true
    this.createRestriccion()
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

  saveScore(){
    console.log('guardado')
    let scoreObject = {
      tema: this.currentTheme._id,
      score: this.points
    }
    this.scoreService.createScore(scoreObject).subscribe(
      res => {
        console.log(res)
      },error => console.log(error)
    )
  }

  scoreUserLogged = {score: 0}
  
  getScoreUserLogged(){
    this.scoreService.getScoreUserLogged().subscribe(
      res => {
        console.log(res)
        this.scoreUserLogged = res.data.find((x:any) => x.tema.title == this.currentTheme.title)
      }
    )
  }


  chances = 3
  restricted = false

  swalClass = ''
  finishMsg = ''
  emoji= ''
  themeFinished(){
    this.saveScore()

    if ( this.points < this.scoreUserLogged.score) {
      this.finishMsg = 'Lo sentimos, tu nuevo récord es menor al anterior'
      this.swalClass = 'text-danger'
      this.emoji = 'fas fa-sad-tear'
    }else if (this.points == this.scoreUserLogged.score) {
      this.finishMsg = 'Has obtenido la misma puntuación'
      this.swalClass = 'text-info'
      this.emoji = 'fas fa-grin-beam'
    }else if (this.points > this.scoreUserLogged.score){
      console.log('mayor')
      this.finishMsg = 'Felicidades, tu nuevo récord es mayor al anterior'
      this.swalClass = 'text-success'
      this.emoji = 'fas fa-laugh-beam'
      }
    
    Swal.fire({
      icon: 'success',
      title: 'Tema finalizado',
      html: `<p>Haz finalizado este tema.</p> <h5 class="${this.swalClass}">Tu nueva puntuación es: ${this.points}</h5> <p class="${this.swalClass}">${this.finishMsg} </p> <p class="${this.swalClass}" style="font-size: 40px" ><i class="${ this.swalClass , this.emoji}"></i> </p> `,
      confirmButtonColor: '#17a2b8',
      confirmButtonText: 'Ir a los récords'
    }).then(x=>{
      if (x.isConfirmed) {
        this.finished = true
        this.router.navigate(['/dashboard/records'])
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

    if (this.i == 19) {
      this.finish = true
    }
  }
  
  cantBePlayed = false
  pregProvisional: QuestionModel[] = []
  getAllQuestionsByTheme() {
    this.pService.getPreguntaByTemaId(this.getLink())
      .subscribe(
        async (res) => {
          this.pregProvisional = res.data
          this.pregProvisional = await Promise.all(this.pregProvisional.sort((a, b) => 0.5 - Math.random()))
          for (let i = 0; i < 20; i++) {
            this.currentQuestion.push(this.pregProvisional[i])
          }

          if (this.currentQuestion[19] == undefined) {
            this.cantBePlayed = true
          }
          this.currentResps = this.currentQuestion[this.i].respuestas
          this.currentResps = this.currentResps.sort((a, b) => 0.5 - Math.random())
        }
    )
  }

  //RESTRICTION AREA

  count = 0
  restrcitedTheme:any = {}
  timeRestriction : any
  actualTime = new Date()
  currentHouer = this.actualTime.getHours()

  formule : any 

  getUserLoggedRestriction(){
    this.restrictionService.getUserLoggedRestrictions()
    .subscribe(
      res => {        
        console.log(res.data)
        this.restrcitedTheme = res.data.find((x:any)=> x.tema.title == this.currentTheme.title)
        
        if (this.restrcitedTheme === undefined) {
          this.restricted = false
        }
        else { 
          this.count = this.restrcitedTheme.count
          this.timeRestriction = + this.restrcitedTheme.createdAt.substring(11, 13) - 4

          console.log(this.currentHouer)
          console.log(this.timeRestriction)
          
          let dif = this.currentHouer - this.timeRestriction 

          if (dif < 0) {
            dif = dif * -1
          }
          this.formule = 12 - dif
          this.chances = this.chances - this.count          
          if (this.restrcitedTheme.restriccion == true) {
            this.restricted = true
          }
          else {
            this.restricted = false
          }
        }
        console.log(this.restricted)
      }
    )
  }

  createRestriccion(){
    this.restrictionService.createRestriction({ tema: this.currentTheme._id})
    .subscribe( res => console.log(res),  error => console.log(error))
  }
  
}
