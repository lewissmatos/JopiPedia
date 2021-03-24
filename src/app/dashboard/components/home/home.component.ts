import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data: any[] = [
    {
      bgColor: '#F13785',
      title: 'Quimica',
      subTitle: 'dsad',
      desc: ''
    },
    {
      bgColor: '#2980B9',
      title: 'Fisica',
      subTitle: 'dsad',
      desc: ''
    },
    {
      bgColor: '#2ECC71',
      title: 'Biologia',
      subTitle: 'dsad',
      desc: ''
    },
    {
      bgColor: '#E74C3C',
      title: 'Matematicas',
      subTitle: 'dsad',
      desc: ''
    },
    {
      bgColor: '#F1948A',
      title: 'Mitologia',
      subTitle: 'dsad',
      desc: ''
    },
    {
      bgColor: '#5D6D7E',
      title: 'Tecnologia',
      subTitle: 'dsad',
      desc: ''
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
