import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient) { }

  uploadPhoto(data: any): Observable<any> {
    return this.http.post<any>(
        'https://api.cloudinary.com/v1_1/drjkf0hig/image/upload',
        data
      )
    }
}
