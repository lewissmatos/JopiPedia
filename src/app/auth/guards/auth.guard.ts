import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _router: Router, private authService: AuthService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!localStorage.getItem('token')) {
        this._router.navigate(['/auth/login'])
      }
      else {
        this.authService.getData().subscribe(
          res => {
            if (res.data.isAdmin) {
              this._router.navigate(['/admin/home'])
            }
          },
          error => console.log(error)
        )
      }
    return true;
  }
  
}
