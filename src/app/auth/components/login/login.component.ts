import { AuthService } from './../../Services/auth.service';
import { User } from './../../Models/user.model';
import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup } from '@angular/forms';

import Swal from 'sweetalert2'
import { Router } from '@angular/router';

declare const $:any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formData!: FormGroup;
  userData!: User

  constructor(
    private router: Router,
    private fBuilder: FormBuilder,
    private authService: AuthService
  ) {
    
    this.createForm()
  }

  ngOnInit(): void {
  }
  
  createForm() {
    this.formData = this.fBuilder.group({
      user: [''],
      pass: [''],
    })
  }
  
  public dis = false

  logIn() {
      this.dis = true

      this.userData = this.formData.value     

      this.authService.login(this.userData).subscribe(
        res => {
          localStorage.setItem('token', res.token)
          if (res.isAdmin) {
            this.router.navigate(['/admin/home'])
            localStorage.setItem('modo', 'dark')
            $('#body').addClass('dark')
          }
          else {
            this.router.navigate(['/dashboard/home'])  
            $('#body').removeClass('dark')
            localStorage.removeItem('modo')
          }
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Error de inicio de sesión',
            text: error.error.msg,
            confirmButtonColor: '#FF7952'
          })

          this.dis = false
        }
      )
    
  }  
  
}