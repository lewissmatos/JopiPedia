import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/auth/Models/user.model';
import Swal from 'sweetalert2'
import { UserServicesService } from '../../services/user-services.service';
import { ThemesService } from '../../services/themes.service';
import { cardData } from '../../Models/cardData.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterViewInit{

  currentUser: User = { name: '', lName: '' }
  editedUserData: User = {  name: '', lName: '' }
  toEdit = false
  isOtherProfile: boolean = false
  userNotFound: boolean = false
  username: string = ''

  themes: cardData[]=[]

  constructor(
    private tService: ThemesService,
    private router: Router,
    private userService: UserServicesService,
    private acRouter: ActivatedRoute
  ) {
    this.getAllThemes()
  }

  ngAfterViewInit(): void {
    this.username = this.acRouter.snapshot.params.user
    if (typeof this.acRouter.snapshot.params.user == 'undefined') {
      this.isOtherProfile = false
      this.getUserInfo()
    }
    else {
      this.isOtherProfile = true
      this.getForeignPerfil(this.acRouter.snapshot.params.user)
    }
  }

  ngOnInit(): void {
  }

  charg = true
 
  getUserInfo() {
    this.userService.getUserInfo().subscribe(
      res => {
        this.currentUser = res.user
        this.editedUserData = { ...this.currentUser }
        this.charg = false
      },
      error => console.log(error)
    )
  }

  getForeignPerfil(username: any) {
    this.userService.getForeignPerfil(username).subscribe(
      res => {
        this.currentUser = res.data
        this.charg = false
      },
      error => {
        console.log(error)
        if (error.error.msg == 'usuario no encontrado') {
          this.userNotFound = true
          console.log('user not found')
          this.charg = false
        }
      }
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
      icon: 'warning',
      showCancelButton: false,
      confirmButtonColor: '#7AC0AB',     
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

  logOut() {
    Swal.fire({
      title: 'Cerrar Sesión',
      text: "¿Confirma que desea cerrar sesión?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#7AC0AB',
      cancelButtonColor: '#FF7952',
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

  getAllThemes() {
    return this.tService.getAllThemes()
      .subscribe(
        res => {
          this.themes = res.data
        }
    )
  }
}
