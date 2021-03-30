import { Component, Input, OnInit } from '@angular/core';
import { cardData } from '../../Models/cardData.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.style.scss']
})
export class CardComponent implements OnInit {

  @Input() public cardData: cardData = {
    _id: '',
    bgColor: '',
    title: '',
    desc: ''
  }

  constructor(private router: Router) { 
    if (this.cardData.bgColor === '') {
      this.cardData.bgColor = '#FFF'
    }
  }

  ngOnInit(): void {
  }

  goTest(_id: any) {
    this.router.navigate(['dashboard/test', _id ])
  }

}
