import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestrictionService {

  constructor(private http: HttpClient) { }

  private API: string = 'https://jopipedia.herokuapp.com/api/restriccion'

  getUserLoggedRestrictions(){
    return this.http.get<any>(this.API, {
      headers: new HttpHeaders({    
        'Authorization': localStorage.getItem('token') + ''
      })
    })
  }

  createRestriction(data: any){
    return this.http.post<any>(this.API, data, {
      headers: new HttpHeaders({    
        'Authorization': localStorage.getItem('token') + ''
      })
    })
  }

  getUserRestrictionsByUsername(username: string){
    return this.http.get<any>(this.API + '/' + username)
  }
  
}
