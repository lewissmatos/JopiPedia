import { Component, OnInit } from '@angular/core';
import { cardData } from 'src/app/dashboard/Models/cardData.model';
import { ThemesService } from 'src/app/dashboard/services/themes.service';
import Swal from 'sweetalert2'
import { AdminPreguntaService } from '../../services/admin-pregunta.service';
@Component({
  selector: 'app-admin-preguntas',
  templateUrl: './admin-preguntas.component.html',
  styleUrls: ['./admin-preguntas.component.css']
})
export class AdminPreguntasComponent implements OnInit {

  data: cardData = {}
  
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

  createQuestion(data: any) {
    this.pService.createPregunta(data)
      .subscribe(
        res => {
          console.log(res.data)
        }
      )    
  }

  AddMoreQ() {
    this.moreQ = !this.moreQ
  }
}
