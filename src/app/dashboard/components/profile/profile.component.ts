import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/auth/Models/user.model';
import Swal from 'sweetalert2'
import { UserServicesService } from '../../services/user-services.service';
import { ThemesService } from '../../services/themes.service';
import { cardData } from '../../Models/cardData.model';
import { ScoreService } from '../../services/score.service';

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

  themes: cardData[]=[]

  constructor(
    private tService: ThemesService,
    private router: Router,
    private userService: UserServicesService,
    private acRouter: ActivatedRoute,
    private scoreService: ScoreService
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

  charg = true
 
  getUserInfo() {
    this.userService.getUserInfo().subscribe(
      res => {
        if (this.isOtherProfile) {
          this.userLogged = res.user
          if (this.currentUser.fans?.find(x => x.user == this.userLogged.user)) {
            this.isFans = true
          }
          else {
            this.isFans = false
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
          console.log(this.currentUser)
        }
      },
      error => console.log(error)
    )
  }

  changeProfile(username: any) {
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
      this.foto = '../../../../assets/user-profile.png'
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

      this.editedUserData = {...this.editUserInfo, foto: this.foto}

      this.userService.editUserInfo(this.editedUserData)
        .subscribe(res => {        
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

  fileSelect: any = ''
  foto: any = '../../../../assets/user-profile.png'
  encodeImage(e: any) {
    this.fileSelect = (<HTMLInputElement>document.getElementById('formFile')).files || ''
    if (this.fileSelect.length > 0) {
      let newFileSelect = this.fileSelect[0]
      
      let fileReader = new FileReader()
      
      let self = this
      fileReader.onload = function(FileLoadEvent) {
        self.foto = FileLoadEvent.target?.result
        console.log(FileLoadEvent.target?.result)
      }
      fileReader.readAsDataURL(newFileSelect)
    }
  }

}