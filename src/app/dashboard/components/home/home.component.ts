import { Component, OnInit } from '@angular/core';
import { cardData } from '../../Models/cardData.model';


declare const $:any

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data: cardData[] = []
  dataFiltered: cardData[] = []

  constructor() {
    this.data = [
      {
        bgColor: 'rgb(216, 27, 96, 0.7)',
        title: 'quimica',
        subTitle: 'dsad',
        desc: 'aaaaaa'
      },
      {
        bgColor: 'rgb(211, 47, 47, 0.7)',
        title: 'fisica',
        subTitle: 'dsad',
        desc: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      },
      {
        bgColor: 'rgb(39, 174, 96, 0.7)',
        title: 'biologia',
        subTitle: 'dsad',
        desc: 'aaaaa'
      },
      {
        bgColor: 'rgb(255, 87, 34, 0.7)',
        title: 'matematicas',
        subTitle: 'dsad',
        desc: 'aaaaa'
      },
      {
        bgColor: 'rgb(93, 173, 226, 0.7)',
        title: 'mitologia',
        subTitle: 'dsad',
        desc: 'aaaaa'
      },
      {
        bgColor: 'rgb(69, 90, 100, 0.7)',
        title: 'tecnologia',
        subTitle: 'dsad',
        desc: 'aaaaa'
      },
      {
        bgColor: 'rgb(253, 216, 53, 0.7)',
        title: 'astrologia',
        subTitle: 'dsad',
        desc: 'aaaaa'
      },
      {
        bgColor: 'rgb(135, 54, 0, 0.7)',
        title: 'historia',
        subTitle: 'dsad',
        desc: 'aaaaa'
      },
    ]
  }

  ngOnInit(): void {
  }

  search = (title: string) => {
    this.dataFiltered = this.data.filter((x: cardData) => x.title.toLowerCase().includes(title.toLowerCase()))
    console.log(this.dataFiltered)
  }


}
