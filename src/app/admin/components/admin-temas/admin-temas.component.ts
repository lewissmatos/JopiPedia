import { Component, OnInit } from '@angular/core';
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
        background: '#758080',                
        icon: 'error',
        title: 'Error!',
        html: '<p>Debe completar todos los campos</p>',
        confirmButtonColor: '#7AC0AB',        
      })
    } else {    
        this.tService.createTheme(this.data)
          .subscribe(
            res => {
              console.log(res)
              this.getAllThemes()
              this.data = { bgColor: '#808B96' }              
              Swal.fire({
                background: '#758080',
                icon: 'success',
                title: 'Agregado!',
                html: '<p>Tema agregado correctamente.</p>',
                confirmButtonColor: '#7AC0AB'
              })
    
            }, error => {
              console.log(error)
              Swal.fire({
                background: '#758080',
                icon: 'error',
                title: 'Error!',
                html: '<p>Ha ocurrido un error.</p>',
                confirmButtonColor: '#7AC0AB'
              })
          }
        )      
    }
  }

  deteleTheme(id: any) {
  
    Swal.fire({
      background: '#758080',                
      icon: 'question',
      title: 'Eliminar',
      html: '<p>Seguro que desea eliminar?</p>',      
      confirmButtonColor: '#7AC0AB',
      showCancelButton: true,
      cancelButtonColor: '#FF7952'
    }).then(
      res => {
        if (res.isConfirmed) {
    
          this.tService.deleteTheme(id)
      .subscribe(
        res => {
          this.getAllThemes()
          Swal.fire({
            background: '#758080',                
            icon: 'success',
            title: 'Eliminado!',            
            html: '<p>Tema eliminado correctamente!</p>',
            confirmButtonColor: '#7AC0AB',
          })
      }, error => {
        console.log(error)
          Swal.fire({
          background: '#758080',                
          icon: 'error',
          title: 'Error!',
          html: '<p>Ha ocurrido un error.</p>',          
          confirmButtonColor: '#7AC0AB',
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
  }

  saveEdit() {
    if (this.data.title == null || this.data.desc == null ) {
      Swal.fire({
        background: '#758080',                
        icon: 'error',
        title: 'Error!',
        text: 'Debe completar todos los campos',
        confirmButtonColor: '#7AC0AB',
      })
    } else {    
        this.tService.updateTheme(this.data, this.data._id)
          .subscribe(
            res => {
              this.getAllThemes()
              this.data = { bgColor: '#808B96' }
              this.toEdit = false
              
              Swal.fire({
                background: '#758080',              
                icon: 'success',
                title: 'Tema actualizado correctamente!',
                confirmButtonColor: '#7AC0AB',
              })
    
            }, error => {
              console.log(error)
              Swal.fire({
                background: '#758080',              
                icon: 'error',
                title: 'Ha ocurrido un error.',
                confirmButtonColor: '#7AC0AB',
              })
          }
        )      
    }
  }
}
