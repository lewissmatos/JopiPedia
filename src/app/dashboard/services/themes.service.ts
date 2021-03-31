import { cardData } from './../Models/cardData.model';
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

  createTheme(data: cardData) {
    return this.http.post<any>(this.api, data, {
      headers: new HttpHeaders({    
        'Authorization': localStorage.getItem('token') + ''
      })
    })
  }

  updateTheme(data: cardData, id: any) {
    return this.http.put<any>(this.api + id, data, {
      headers: new HttpHeaders({    
        'Authorization': localStorage.getItem('token') + ''
      })
    })
  }
  
  deleteTheme(id: any) {
    return this.http.delete<any>(this.api + id, {
      headers: new HttpHeaders({    
        'Authorization': localStorage.getItem('token') + ''
      })
    })
  }
}
