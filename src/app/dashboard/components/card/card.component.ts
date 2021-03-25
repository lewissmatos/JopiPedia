import { Component, Input, OnInit } from '@angular/core';
import { cardData } from '../../Models/cardData.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.style.scss']
})
export class CardComponent implements OnInit {

  @Input() public cardData: cardData = {
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
