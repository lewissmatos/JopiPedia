import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formData!: FormGroup;

  constructor(private fBuilder: FormBuilder) {
    
    this.createForm()
  }

  ngOnInit(): void {
  }

  
  get invalidUser() {
    return this.formData.get('user')?.invalid && this.formData.get('user')?.touched
  }
  get invalidPass() {
    return this.formData.get('pass')?.invalid && this.formData.get('pass')?.touched
  }
  
  v = Validators
  createForm() {
    this.formData = this.fBuilder.group({
      user: ['', [this.v.required, this.v.minLength(5), this.v.maxLength(30)]],
      pass: ['', [this.v.required, this.v.minLength(8), this.v.maxLength(30)]],
    })
  }
  
  logIn() {
    if (this.formData.invalid) {
      Object.values(this.formData.controls).forEach(control => {

        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => control.markAllAsTouched())
        } else {

          control.markAsTouched()
        }
      })
    }
   
  }  
  
}