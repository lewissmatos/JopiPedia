import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { cardData } from '../../Models/cardData.model';
import { ThemesService } from '../../services/themes.service';

import Swal from 'sweetalert2'

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
  constructor(private router: ActivatedRoute, private tService: ThemesService) {
    this.getThemeById()
  }

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

}
