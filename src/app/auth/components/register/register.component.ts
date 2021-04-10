import { Router, RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, NgForm } from '@angular/forms';
import { User } from '../../Models/user.model';

import Swal from 'sweetalert2'
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formData!: FormGroup
  userData!: User

  constructor(
    private router: Router,
    private authService: AuthService,
    private fBuilder: FormBuilder) {
    this.createForm()
  }

  ngOnInit(): void {

  }

  get invalidName() {
    return this.formData.get('name')?.invalid && this.formData.get('name')?.touched
  }
  get invalidLName() {
    return this.formData.get('lName')?.invalid && this.formData.get('lName')?.touched
  }
  get invalidUser() {
    return this.formData.get('user')?.invalid && this.formData.get('user')?.touched
  }
  get invalidEmail() {
    return this.formData.get('email')?.invalid && this.formData.get('email')?.touched
  }
  get invalidPass1() {
    return this.formData.get('pass')?.invalid && this.formData.get('pass')?.touched
  }
  get invalidPass2() {
    const pass = this.formData.get('pass')?.value
    const rPass = this.formData.get('rPass')?.value

    return (pass === rPass) ? false : true
  }
 
  v = Validators
  createForm() {
    this.formData = this.fBuilder.group({
      name: ['', [this.v.required, this.v.minLength(2), this.v.maxLength(30)]],
      lName: ['', [ this.v.required, this.v.minLength(2), this.v.maxLength(30)]],
      user: ['', [this.v.required, this.v.minLength(5), this.v.maxLength(30)]],
      email: ['', [this.v.required, this.v.minLength(10), this.v.maxLength(30)]],
      pass: ['', [this.v.required,this.v.minLength(8), this.v.maxLength(30)]],
      rPass: ['', [this.v.required, this.v.minLength(8), this.v.maxLength(30)]],
    })
  }

  public dis = false

  signUp() {

    this.dis = true

    if (this.formData.invalid) {
      Object.values(this.formData.controls).forEach(control => {

        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => control.markAllAsTouched())
        } else {

          control.markAsTouched()
        }
      })
    }
   

    if (this.formData.valid == false) {
      Swal.fire({
        icon: 'error',
        title: 'Registro invdalid',
        text: 'Debes llenar todos los campos',
        confirmButtonColor: '#17a2b8'
      })
      
      this.dis = false
    }

    else {

      this.userData = this.formData.value
      console.log(this.userData)

      this.authService.register(this.userData).subscribe(
        res => {
          localStorage.setItem('token', res.token)
          this.router.navigate(['/dashboard/home'])
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Llene todos los campos correctamente',
            text: error.error.msg,
            confirmButtonColor: '#17a2b8'
          })
          this.dis = false
        }
      )
    }
  }
}
