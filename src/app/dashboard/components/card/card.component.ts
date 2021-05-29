import { Component, Input, OnInit } from '@angular/core';
import { cardData } from '../../Models/cardData.model';
import { Router } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
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
    desc: '',
    icon: ''
  }

  constructor(private router: Router, private breakpointObserver: BreakpointObserver) { 
    if (this.cardData.bgColor === '') {
      this.cardData.bgColor = '#FFF'
    }
    this.iconChangePlace()

  }

  ngOnInit(): void {
  }

  goTest(_id: any) {
    this.router.navigate(['dashboard/test', _id ])
  }

  iconOnTitle = true

  iconChangePlace() {
    this.breakpointObserver
      .observe(['(max-width: 577px)'])
      .subscribe((state: BreakpointState) => {
     
        state.matches? this.iconOnTitle = false : this.iconOnTitle = true
      })
  }

}
