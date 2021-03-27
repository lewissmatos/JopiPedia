import { User } from './../Models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api = 'https://jopipedia.herokuapp.com/api/auth'

  constructor(private http: HttpClient) { }
  
  register(data: User) {
    return this.http.post<any>(this.api + '/register', data)
  }
  
  login(data: User) {
    return this.http.post<any>(this.api + '/login', data)
  }
}
