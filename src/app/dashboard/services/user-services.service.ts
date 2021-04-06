import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/auth/Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {

  api = 'https://jopipedia.herokuapp.com/api/user'
  /* httpOptions = {
    headers: new HttpHeaders({    
      'Authorization': localStorage.getItem('token') + ''
    })

  } */

  constructor(private http: HttpClient) { }

  getUserInfo() {
    return this.http.get<any>(this.api, {
      headers: new HttpHeaders({    
        'Authorization': localStorage.getItem('token') + ''
      })
    })
  }

  getForeignPerfil(username: any) {
    return this.http.get<any>(this.api + '/' + username, {
      headers: new HttpHeaders({    
        'Authorization': localStorage.getItem('token') + ''
      })
    })
  }
  
  editUserInfo(data: User) {    
    return this.http.put<any>(this.api, data, {
      headers: new HttpHeaders({    
        'Authorization': localStorage.getItem('token') + ''
      })
    })
  }

  uuu = this.getAllUsers()
  getAllUsers() {    
    return this.http.get<any>(this.api + '/getallusers')
  }

}
