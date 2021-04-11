import { Component, OnInit } from '@angular/core';
import { cardData } from 'src/app/dashboard/Models/cardData.model';
import { ThemesService } from 'src/app/dashboard/services/themes.service';
import Swal from 'sweetalert2'
import { QuestionModel } from '../../Models/Question.model';
import { AdminPreguntaService } from '../../services/admin-pregunta.service';
@Component({
  selector: 'app-admin-preguntas',
  templateUrl: './admin-preguntas.component.html',
  styleUrls: ['./admin-preguntas.component.css']
})
export class AdminPreguntasComponent implements OnInit {

  data: cardData = {}
  tema: any
  tBgColor: any
  editQ: boolean = false
  
  moreQ= false
  allThemes: cardData[] = []

  questionData = {
    question: '',
    rc: '',
    ri1: '',
    ri2: '',
    ri3: '',
    ri4: '',
    ri5: '',
  }

  questionDataFinal: QuestionModel = {
    respuestas: [
      { desc: '', correcta: true },
      { desc: '', correcta: false },
      { desc: '', correcta: false },
      { desc: '', correcta: false },     
    ]
  }
  
  constructor(private tService: ThemesService, private pService: AdminPreguntaService) {
    this.getAllThemes()
    console.log(this.questionData.question)
  }

  ngOnInit(): void {
  }

  getAllThemes() {
    this.tService.getAllThemes()
      .subscribe(
        res => {
          this.allThemes = res.data
      }, error =>  console.log(error)
    )
  }

  loading= false
  loadEdit= false

  createQuestion() {
    this.loading = true
    this.questionDataFinal = {...this.questionDataFinal, tema: this.tema}
    console.log(this.questionDataFinal)
    
    console.log(this.questionDataFinal)

    this.pService.createPregunta(this.questionDataFinal)
      .subscribe(
        res => {
          this.loading = false
          Swal.fire({
            icon: 'success',
            background: '#758080',                
            html: '<p>Pregunta agregada exitosamente!</p>',
            confirmButtonColor: '#7AC0AB'
          })
          
          this.questionDataFinal = {
            respuestas: [
              { desc: '', correcta: true },
              { desc: '', correcta: false },
              { desc: '', correcta: false },
              { desc: '', correcta: false },     
            ]
          }
          console.log(res.data)
        }, error => console.log(error)
      )    
  }

  edit(q: any){
    this.editQ = true
    this.questionDataFinal = q
    this.tema = q.tema._id
    this.tBgColor = q.tema.bgColor
  }
  
  updateQuestion() {
    this.loadEdit = true
    this.pService.updatePregunta(this.questionDataFinal, this.questionDataFinal._id).subscribe(
      res => {
        this.loadEdit = false
        this.editQ = false
        this.questionDataFinal = {
          respuestas: [
            { desc: '', correcta: true },
            { desc: '', correcta: false },
            { desc: '', correcta: false },
            { desc: '', correcta: false },     
          ]
        }
        Swal.fire({
          icon: 'success',
          background: '#758080',                
          html: '<p>Pregunta editada exitosamente!</p>',
          confirmButtonColor: '#7AC0AB'
        })
      },
      error => {
        this.loadEdit = false
        console.log(error)
      }
    )
  }

  changeTheme() {
    console.log(this.tema)
    this.tBgColor = this.allThemes.find(x => x._id == this.tema)?.bgColor
    console.log(this.tBgColor)
  }
  
  themeId: cardData = {}
  v: boolean = false

  charg = false

  sendThemeId(theme: any) {
    this.v = true
    this.themeId = theme
    this.charg = true
    this.getQuestionByTheme()

  }

  allQData: any = []
  getQuestionByTheme() {
    this.pService.getPreguntaByTemaId(this.themeId._id)
      .subscribe(
        res => {
          this.allQData = res.data
          this.charg = false
        }, error => console.log(error)
    )
  }

  deleteQuestion(idP: string) {
    Swal.fire({
      icon: 'question',
      background: '#758080',                
      title: 'Eliminar',
      html: '<p>Seguro que desea eliminar?</p>',
      showCancelButton: true,
      cancelButtonColor: '#FF7952',
      confirmButtonColor: '#7AC0AB',
    }).then (res => {if (res.isConfirmed) {
      this.pService.deletePregunta(idP)
        .subscribe(
          res => {          
            this.getQuestionByTheme()
        }, error => console.log(error)
      )      
    }})
  }
}
