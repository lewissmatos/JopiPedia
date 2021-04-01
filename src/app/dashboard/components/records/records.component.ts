import { Component, OnInit } from '@angular/core';
import { cardData } from '../../Models/cardData.model';
import { ThemesService } from '../../services/themes.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {

  data: cardData[] = []
  dataFiltered: cardData[] = []

  obs = false

  constructor(private tService: ThemesService) {
    this.getAllThemes()
  }

  ngOnInit(): void {
  }

  getAllThemes() {
    return this.tService.getAllThemes()
      .subscribe(
        res => {
          console.log(res)
          this.data = res.data
        }
    )
  }

  search = (title: string) => {
    this.dataFiltered = this.data.filter((cd: cardData) => cd.title?.toLowerCase().includes(title.toLowerCase()))    
    
  
    if (title.length > 0) {
      this.obs = true
    }

  }
}
