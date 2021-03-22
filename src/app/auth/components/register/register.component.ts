import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
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
  
  v = Validators
  createForm() {
    this.formData = this.fBuilder.group({
      name: ['', this.v.required, this.v.minLength(2), this.v.maxLength(30)],
      lName: ['', this.v.required, this.v.minLength(2), this.v.maxLength(30)],
      user: ['', this.v.required, this.v.minLength(5), this.v.maxLength(30)],
      email: ['', this.v.required, this.v.minLength(8), this.v.maxLength(30), this.v.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+/.[a-z]{2,3}$')],
      pass: ['', this.v.required,this.v.minLength(8), this.v.maxLength(30)],
      rPass: ['', this.v.required, this.v.minLength(8), this.v.maxLength(30)]
    }
    
  )

  }
  signUp() {
    
  }
}
