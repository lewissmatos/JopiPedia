import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  private API: string = 'https://jopipedia.herokuapp.com/api/score'

  constructor(private http: HttpClient) { }

  getAllScores() {
    return this.http.get<any>(this.API, {
      headers: new HttpHeaders({    
        'Authorization': localStorage.getItem('token') + ''
      })
    })
  }

  getScoreUserLogged() {
    return this.http.get<any>(this.API + '/scoreuserlogged', {
      headers: new HttpHeaders({    
        'Authorization': localStorage.getItem('token') + ''
      })
    })
  }

  getHighestScores() {
    return this.http.get<any>(this.API + '/highestscores')
  }

  createScore(data: any) {
    return this.http.post<any>(this.API, data, {
      headers: new HttpHeaders({    
        'Authorization': localStorage.getItem('token') + ''
      })
    })
  }
}
