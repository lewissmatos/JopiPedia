import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }
  
  activatedH = false
  activatedR = false
  activatedP = false
  activatedS = false

  ngOnInit(): void {
    this.activatedH = true
  }  

  goHome() {
    this.router.navigate(['/dashboard/home'])
    this.activatedH = true
    this.activatedR = false
    this.activatedP = false
    this.activatedS = false

  }

  goRecords() {
    this.router.navigate(['/dashboard/records'])
    this.activatedR = true
    this.activatedH = false
    this.activatedP = false
    this.activatedS = false

  }
  goSearchPeople() {
    this.router.navigate(['/dashboard/search-people'])
    this.activatedS = true
    this.activatedH = false
    this.activatedP = false
    this.activatedR = false

  }
  goProfile() {
    this.router.navigate(['/dashboard/profile'])
    this.activatedP = true
    this.activatedH = false
    this.activatedR = false
    this.activatedS = false

  }

}
