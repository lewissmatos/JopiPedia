import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  act1: boolean = true
  act2: boolean = false
  
  change() {
    this.act1 = true
    this.act2 = false
   
  }
  change2() {

    this.act1 = false
    this.act2 = true
  }

}
