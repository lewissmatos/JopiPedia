import { Component, OnInit } from '@angular/core';
import { title } from 'node:process';
import { cardData } from 'src/app/dashboard/Models/cardData.model';
import { ThemesService } from 'src/app/dashboard/services/themes.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-admin-temas',
  templateUrl: './admin-temas.component.html',
  styleUrls: ['./admin-temas.component.scss']
})
export class AdminTemasComponent implements OnInit {

  allThemes: cardData[] = []

  data: cardData = {
    bgColor: '#808B96'
  }

  toEdit = false

  constructor(private tService: ThemesService) {
    this.getAllThemes()
  }

  ngOnInit(): void {
  }

  getAllThemes() {
    this.tService.getAllThemes()
      .subscribe(
        res => {
          this.allThemes = res.data
          this.allThemes.reverse()
      }, error =>  console.log(error)
    )
  }

  createTheme() {
    if (this.data.title == null || this.data.desc == null ) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Debe completar todos los campos',
      })
    } else {    
        this.tService.createTheme(this.data)
          .subscribe(
            res => {
              console.log(res)
              this.getAllThemes()
              this.data = { bgColor: '#808B96' }
              
              Swal.fire({
                icon: 'success',
                title: 'Tema agregado correctamente!'
              })
    
            }, error => {
              console.log(error)
              Swal.fire({            
                icon: 'error',
                title: 'Ha ocurrido un error.'
              })
          }
        )      
    }
  }

  deteleTheme(id: any) {
  
    Swal.fire({
      icon: 'question',
      title: 'Eliminar',
      text: 'Seguro que desea eliminar?',
      showCancelButton: true,
      cancelButtonColor: '#FF0000'
    }).then(
      res => {
        if (res.isConfirmed) {
    
          this.tService.deleteTheme(id)
      .subscribe(
        res => {
          this.getAllThemes()
          Swal.fire({
            icon: 'success',
            title: 'Eliminado!',
            text: 'Tema eliminado correctamente!'
          })
      }, error => {
        console.log(error)
        Swal.fire({            
          icon: 'error',
          title: 'Ha ocurrido un error.'
        })
    }
          )
          
        }
      }
    )

  }

  editTheme(data: any) {
    this.toEdit = true

    this.data = data
    console.log(data)
  }

  saveEdit() {
    if (this.data.title == null || this.data.desc == null ) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Debe completar todos los campos',
      })
    } else {    
        this.tService.updateTheme(this.data, this.data._id)
          .subscribe(
            res => {
              this.getAllThemes()
              this.data = { bgColor: '#808B96' }
              this.toEdit = false
              
              Swal.fire({
                icon: 'success',
                title: 'Tema actualizado correctamente!'
              })
    
            }, error => {
              console.log(error)
              Swal.fire({            
                icon: 'error',
                title: 'Ha ocurrido un error.'
              })
          }
        )      
    }
  }
}
