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
      { desc: '', correcta: false },
      { desc: '', correcta: false}
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

  createQuestion() {
    
    
    this.questionDataFinal = {...this.questionDataFinal, tema: this.tema}
    console.log(this.questionDataFinal)
    
    if (this.questionDataFinal.respuestas[4].desc == '' ) {
       this.questionDataFinal.respuestas.splice(4,1)
       this.questionDataFinal.respuestas.splice(4,1)
      
    }
    
    console.log(this.questionDataFinal)

    this.pService.createPregunta(this.questionDataFinal)
      .subscribe(
        res => {
          console.log(res.data)
        }, error => console.log(error)
      )    
  }

  AddMoreQ() {
    this.moreQ = !this.moreQ
  }

  changeTheme() {
    console.log(this.tema)
    this.tBgColor = this.allThemes.find(x => x._id == this.tema)?.bgColor
    console.log(this.tBgColor)
  }

  getQuestionByTheme() {
    //this.pService.g
  }
}
