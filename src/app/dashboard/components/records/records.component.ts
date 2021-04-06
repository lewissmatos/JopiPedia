import { Component, OnInit } from '@angular/core';
import { cardData } from '../../Models/cardData.model';
import { ScoreService } from '../../services/score.service';
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

  constructor(private tService: ThemesService, private scoreService: ScoreService) {
    this.getAllThemes()
    this.getHighestScores()
  }

  ngOnInit(): void {
  }

  charg = true

  getAllThemes() {
    return this.tService.getAllThemes()
      .subscribe(
        res => {
          this.charg = false
          this.data = res.data
        }
    )
  }

  highestScores: any[] = []
  getHighestScores(){
    return this.scoreService.getHighestScores()
    .subscribe(
      res => {
        console.log(res.data)
        this.highestScores = res.data
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
