import { Component } from '@angular/core';

declare const $:any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'JopiPedia';

  constructor() {
    if (localStorage.getItem('modo') == 'dark') {
      $('#body').addClass('dark')
    }
  }
}
