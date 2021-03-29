import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/Models/user.model';
import Swal from 'sweetalert2'
import { UserServicesService } from '../../services/user-services.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: User = { name: '', lName: '' }
  editedUserData: User = {}
  toEdit = false

  constructor(private router: Router, private userService: UserServicesService) {
    this.getUserInfo()
  }

  ngOnInit(): void {
  }

  logOut() {
    Swal.fire({
      title: 'Cerrar Sesión',
      text: "¿Confirma que desea cerrar sesión?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar'
    }).then(
      res => {
        if (res.isConfirmed) {
          localStorage.removeItem('token')
          this.router.navigate(['/auth/login'])
        }
      })
  }

  getUserInfo() {
    this.userService.getUserInfo().subscribe(
      res => {
        this.currentUser = res.user
        this.editedUserData = { ...this.currentUser }
      },
      error => console.log(error)
    )
  }


    
  edit() {
    if (this.toEdit) {
      this.editedUserData = { ...this.currentUser }
    }
    this.toEdit = !this.toEdit
  }

  editUserInfo() {

    if (this.editedUserData.name?.length === 0 || this.editedUserData.lName?.length === 0 ) {
      Swal.fire({
      title: 'Editar información',
      text: "debe llenar ambos campos para guardar",
      icon: 'info',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',     
      confirmButtonText: 'Aceptar'
      })     
    } else {
      
      delete(this.editedUserData.email)
      delete(this.editedUserData._id)
      delete (this.editedUserData.user)
      this.userService.editUserInfo(this.editedUserData).
        subscribe(res => {        
          this.currentUser = res.data
          this.toEdit = false
        }, error => console.log(error)
        )
    }

  }
}
