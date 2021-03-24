import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.style.scss']
})
export class CardComponent implements OnInit {

  @Input() cardData: any = {
    bgColor: '',
    title: '',
    subTitle: '',
    desc: ''
  }

  constructor() { 
    if (this.cardData.bgColor === '') {
      this.cardData.bgColor = '#FFF'
    }
  }

  ngOnInit(): void {
  }

}
