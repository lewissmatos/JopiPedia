import { ThemesService } from './../../services/themes.service';
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

  obs = false

  constructor(
    private themeService: ThemesService
  ) {    this.getAllThemes()
  }

  ngOnInit(): void {
  }
  

  search = (title: string) => {
    this.dataFiltered = this.data.filter((cd: cardData) => cd.title?.toLowerCase().includes(title.toLowerCase()))    
    
  
    if (title.length > 0) {
      this.obs = true
    }

  }

  charg = true
  getAllThemes() {
    this.themeService.getAllThemes().subscribe(
      res => {
        this.data = res.data
        this.charg = false
      },
      error => console.log(error)
    )
  }
}

