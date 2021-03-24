import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data: any[] = [
    {
      bgColor: 'rgb(216, 27, 96, 0.7)',
      title: 'Quimica',
      subTitle: 'dsad',
      desc: 'aaaaaa'
    },
    {
      bgColor: 'rgb(93, 173, 226, 0.7)',
      title: 'Fisica',
      subTitle: 'dsad',
      desc: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    },
    {
      bgColor: 'rgb(39, 174, 96, 0.7)',
      title: 'Biologia',
      subTitle: 'dsad',
      desc: 'aaaaa'
    },
    {
      bgColor: 'rgb(255, 87, 34, 0.7)',
      title: 'Matematicas',
      subTitle: 'dsad',
      desc: 'aaaaa'
    },
    {
      bgColor: 'rgb(121, 85, 72, 0.7)',
      title: 'Mitologia',
      subTitle: 'dsad',
      desc: 'aaaaa'
    },
    {
      bgColor: 'rgb(69, 90, 100, 0.7)',
      title: 'Tecnologia',
      subTitle: 'dsad',
      desc: 'aaaaa'
    },
    {
      bgColor: 'rgb(253, 216, 53, 0.7)',
      title: 'Astrologia',
      subTitle: 'dsad',
      desc: 'aaaaa'
    },
    {
      bgColor: 'rgb(135, 54, 0, 0.7)',
      title: 'Historia',
      subTitle: 'dsad',
      desc: 'aaaaa'
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
