import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare const $:any

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logOut() {
    localStorage.removeItem('token')
    $('#body').removeClass('dark')
    localStorage.removeItem('modo')
    this.router.navigate(['auth/login'])
  }
}
