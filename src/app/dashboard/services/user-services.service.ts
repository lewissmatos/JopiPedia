import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {

  api = 'https://jopipedia.herokuapp.com/api/user'
  httpOptions = {
    headers: new HttpHeaders({    
      'Authorization': `${localStorage.getItem('token')}`
    })

  }

  constructor(private http: HttpClient) { }

  getUserInfo() {
    return this.http.get<any>(this.api, this.httpOptions)
  }

}
