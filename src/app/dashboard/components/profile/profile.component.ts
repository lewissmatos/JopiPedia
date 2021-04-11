import { PhotoService } from './../../services/photo.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/auth/Models/user.model';
import Swal from 'sweetalert2'
import { UserServicesService } from '../../services/user-services.service';
import { ThemesService } from '../../services/themes.service';
import { cardData } from '../../Models/cardData.model';
import { ScoreService } from '../../services/score.service';
import { SummaryResolver } from '@angular/compiler';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterViewInit{

  currentUser: User = { name: '', lName: '' }
  userLogged: User = { name: '', lName: '' }
  editedUserData: User = {  name: '', lName: '' }
  toEdit = false
  isOtherProfile: boolean = false
  userNotFound: boolean = false
  username: string = ''
  isFans: boolean = false
  charg: boolean = false

  themes: cardData[]=[]

  constructor(
    private tService: ThemesService,
    private router: Router,
    private userService: UserServicesService,
    private acRouter: ActivatedRoute,
    private scoreService: ScoreService,
    private photoService: PhotoService
  ) {
    this.getAllThemes()
    this.getUsers()
  }

  ngAfterViewInit(): void {
    this.isFans = false
    this.username = this.acRouter.snapshot.params.user
    if (typeof this.acRouter.snapshot.params.user == 'undefined') {
      this.isOtherProfile = false
      this.getUserInfo()
      this.getScoreUserLogged()
    }
    else {
      this.isOtherProfile = true
      this.getForeignPerfil(this.username)
      this.getScoresByUsername(this.username)
    }
  }

  userLoggedScores: any[] = []
  getScoreUserLogged(){
    this.scoreService.getScoreUserLogged()
    .subscribe(
      res => {
        console.log(res)
        this.userLoggedScores = res.data
      }
    )  
  }
  
  ngOnInit(): void {
  }

  
  getUserInfo() {
    this.charg = true
    this.userService.getUserInfo().subscribe(
      res => {
        if (this.isOtherProfile) {
          this.userLogged = res.user
          if (this.currentUser.fans?.find(x => x.user == this.userLogged.user)) {
            this.isFans = true
            this.charg = false
          }
          else {
            this.isFans = false
            this.charg = false
          }
        }
        else {
          this.currentUser = res.user
          if (this.currentUser.foto == '' || this.currentUser.foto == undefined) {
            this.foto = '../../../../assets/user-profile.png'
          }
          else {
            this.foto = this.currentUser.foto
          }
          this.editedUserData = { ...this.currentUser }
          this.charg = false
        }
      },
      error => console.log(error)
    )
  }

  changeProfile(username: any) {
    if (this.userLogged.user == username) {
      this.router.navigate(['/dashboard/profile'])
      
    }else
    this.username = username
    this.isOtherProfile = true
    this.getForeignPerfil(this.username)
    this.getScoresByUsername(this.username)

  }

  getScoresByUsername(username: any) {
    this.scoreService.getScoresByUsername(username).subscribe(
      res => {
        console.log(res)
        this.userLoggedScores = res.data
      },
      error => {
        console.log(error)
      }
    )
  }

  allUsers:any[]=[]
  l = this.allUsers.length
  getUsers() {
    this.userService.getAllUsers().subscribe(
      res => {
        this.allUsers = res.users.filter((x: any) => x.isAdmin === false)
      },
      error => {
        console.log(error)
      }
    )
  }

  getForeignPerfil(username: any) {
    this.userService.getForeignPerfil(username).subscribe(
      res => {
        this.currentUser = res.data
        this.charg = false
        this.getUserInfo()
        if (this.currentUser.foto == '' || this.currentUser.foto == undefined) {
          this.foto = '../../../../assets/user-profile.png'
        }
        else {
          this.foto = this.currentUser.foto
        }
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
      if (this.currentUser.foto == '' || this.currentUser.foto == undefined){
        this.foto = '../../../../assets/user-profile.png'
      }
      else {
        this.foto = this.currentUser.foto
      }
    }
    this.toEdit = !this.toEdit
  }
  
  editingInfo = false
  
  uploadPhoto() {
    this.editingInfo = true
    if (this.file.name == undefined) {
      this.editUserInfo()
    }
    else {
      const data = new FormData()
      data.append('file', this.file)
      data.append('upload_preset', 'yxgruubw')
      data.append('cloud_name', 'drjkf0hig')

      this.photoService.uploadPhoto(data).subscribe(
        res => {
          this.foto = res.secure_url
          this.editUserInfo()
        }, 
        error => {
          console.log(error)
        }
      )
    }
  }

  editUserInfo() {
    if (this.editedUserData.name?.length === 0 || this.editedUserData.lName?.length === 0 ) {
      Swal.fire({
      title: 'Editar información',
      text: "debe llenar ambos campos para guardar",
      icon: 'warning',
      showCancelButton: false,
      confirmButtonColor: '#17a2b8',     
      confirmButtonText: 'Aceptar'
      })     
    } else {
      
      delete(this.editedUserData.email)
      delete(this.editedUserData._id)
      delete (this.editedUserData.user)
      delete (this.editedUserData.fans)
      delete (this.editedUserData.isAdmin)

      this.editedUserData.foto = this.foto
      console.log(this.editedUserData)
      
      this.userService.editUserInfo(this.editedUserData)
        .subscribe(res => {   
          Swal.fire({
            icon: 'info',
            title: 'Guardado.',
            text: 'Guardado exitosamente!'
          })    
          this.editingInfo = false
          // this.currentUser = res.data
          this.toEdit = false
          console.log(res)
          this.getUserInfo()
        }, error => {
          console.log(error)
          this.editingInfo = false
          Swal.fire({
            icon: 'error',
            title: 'Error.',
            text: 'Ha ocurrido un error'
          })  
        }
      )

    }
    
  }

  logOut() {
    Swal.fire({
      title: 'Cerrar Sesión',
      text: "¿Confirma que desea cerrar sesión?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#17a2b8',
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


  //FAN FUNCTION AREA
  
  addFans(username: any) {
    this.userService.addFans(username).subscribe(
      res => {
        this.getForeignPerfil(this.username)
      },
      error => {
        console.log(error)
      }
    )
  }

  deleteFans(username: any) {
    this.userService.deleteFans(username).subscribe(
      res => {
        this.getForeignPerfil(this.username)
      },
      error => {
        console.log(error)
      }
    )
  }

  //PICTURE AREA
  file: any = {}
  fileSelect: any = ''
  foto: any = '../../../../assets/user-profile.png'
  encodeImage(e: any) {
    this.fileSelect = (<HTMLInputElement>document.getElementById('formFile')).files || ''
    if (this.fileSelect.length > 0) {
      let newFileSelect = this.fileSelect[0]
      this.file = newFileSelect
      let fileReader = new FileReader()
      
      let self = this
      fileReader.onload = function(FileLoadEvent) {
        self.foto = FileLoadEvent.target?.result
      }
      fileReader.readAsDataURL(newFileSelect)
    }
  }

  fotito: any = '../../../../assets/user-profile.png'


  seePic(){
    Swal.fire({
      html:`<h4>Avatar de @${this.currentUser.user} </h4> <div class="mt-2" > <img width="300px" height="300px" src="${this.foto}" > </div>`,
      confirmButtonText: 'Volver',
      confirmButtonColor: '#17a2b8'
    })
  }
}