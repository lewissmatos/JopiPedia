import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, NgForm } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formData!: FormGroup

  constructor(private fBuilder: FormBuilder) {
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
      email: ['', Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+/.[a-z]{2,3}$')],
      pass: ['', [this.v.required,this.v.minLength(8), this.v.maxLength(30)]],
      rPass: ['', [this.v.required, this.v.minLength(8), this.v.maxLength(30)]],
    })
  }
  
  
  signUp() {
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
