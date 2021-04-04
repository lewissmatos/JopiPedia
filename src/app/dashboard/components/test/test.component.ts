import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { cardData } from '../../Models/cardData.model';
import { ThemesService } from '../../services/themes.service';

import Swal from 'sweetalert2'
import { AdminPreguntaService } from 'src/app/admin/services/admin-pregunta.service';
import { QuestionModel, Resp } from 'src/app/admin/Models/Question.model';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  currentTheme: cardData = {
    _id: '',
    bgColor: '#FFF',
    title: '',
    desc: '',
  }
  
 
  constructor(
    private router: ActivatedRoute, 
    private tService: ThemesService, 
    private pService: AdminPreguntaService
  ) {
    this.getThemeById()
    this.getAllQuestionsByTheme()
  }

  i = 0  
  currentQuestion: QuestionModel[] = []
  currentResps: Resp[] = []

  getLink() {
    return this.router.snapshot.params.id
  }

  getThemeById() {
    return this.tService.getThemeById(this.getLink())    
      .subscribe(
        res => {
          this.currentTheme = res.data
        },
        error => {
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
  ngOnInit(): void {

  }
  previousQ() {
    this.i = this.i- 1
    console.log(this.i)
    this.getAllQuestionsByTheme()
  }

  nextQ() {
    this.i = this.i + 1
    console.log(this.i)
    this.getAllQuestionsByTheme()
  }

  getAllQuestionsByTheme() {
    this.pService.getPreguntaByTemaId(this.getLink())
      .subscribe(
        res => {
          this.currentQuestion = res.data
          console.log(this.currentQuestion)
          this.currentResps = this.currentQuestion[this.i].respuestas
          console.log(this.currentResps)
        }
    )
  }
}
