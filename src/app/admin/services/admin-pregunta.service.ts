import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminPreguntaService {

  api: string = 'https://jopipedia.herokuapp.com/api/pregunta/'

  constructor(private http: HttpClient) { }

  getAllPreguntas() {
    return this.http.get<any>(this.api + 'getallpregunta', {
      headers: new HttpHeaders({    
        'Authorization': localStorage.getItem('token') + ''
      })
    })
  }

  getPreguntaByTemaId(id: string) {
    return this.http.get<any>(this.api + 'getbytemaid/' + id, {
      headers: new HttpHeaders({    
        'Authorization': localStorage.getItem('token') + ''
      })
    })
  }

  createPregunta(data: any) {
    return this.http.post<any>(this.api, data, {
      headers: new HttpHeaders({    
        'Authorization': localStorage.getItem('token') + ''
      })
    })
  }

  updatePregunta(data: any, id: any) {
    return this.http.put<any>(this.api + id, data, {
      headers: new HttpHeaders({    
        'Authorization': localStorage.getItem('token') + ''
      })
    })
  }
  
  deletePregunta(id: any) {
    return this.http.post<any>(this.api + id, {
      headers: new HttpHeaders({    
        'Authorization': localStorage.getItem('token') + ''
      })
    })
  }
}
