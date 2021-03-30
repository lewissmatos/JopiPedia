import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemesService {

  api: string = 'https://jopipedia.herokuapp.com/api/tema/'

  constructor(private http: HttpClient) { }

  getAllThemes() {
    return this.http.get<any>(this.api + 'getalltheme', {
      headers: new HttpHeaders({    
        'Authorization': localStorage.getItem('token') + ''
      })
    })
  }

  getThemeById(id: string) {
    return this.http.get<any>(this.api + 'getthemebyid/' + id, {
      headers: new HttpHeaders({    
        'Authorization': localStorage.getItem('token') + ''
      })
    })
  }
}
