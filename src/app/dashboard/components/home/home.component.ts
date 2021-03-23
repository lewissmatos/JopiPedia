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
      desc: 'sduaskhudsahdhuksahudkasgyjdasiuffjwtfxdhgqryjhdffgyu'
    },
    {
      bgColor: '#B14285',
      title: 'Fisica',
      subTitle: 'dsad',
      desc: 'sduaskhudsahdhuksahudkasgyjdasiuffjwtfxdhgqryjhdffgyu'
    },
    {
      bgColor: '#F13785',
      title: 'Biologia',
      subTitle: 'dsad',
      desc: 'sduaskhudsahdhuksahudkasgyjdasiuffjwtfxdhgqryjhdffgyu'
    },
    {
      bgColor: '#B14285',
      title: 'Fisica',
      subTitle: 'dsad',
      desc: 'sduaskhudsahdhuksahudkasgyjdasiuffjwtfxdhgqryjhdffgyu'
    },
    {
      bgColor: '#F13785',
      title: 'Quimica',
      subTitle: 'dsad',
      desc: 'sduaskhudsahdhuksahudkasgyjdasiuffjwtfxdhgqryjhdffgyu'
    },
    {
      bgColor: '#B14285',
      title: 'Fisica',
      subTitle: 'dsad',
      desc: 'sduaskhudsahdhuksahudkasgyjdasiuffjwtfxdhgqryjhdffgyu'
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
