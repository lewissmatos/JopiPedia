import { Component, OnInit } from '@angular/core';
import { cardData } from '../../Models/cardData.model';
import { ScoreService } from '../../services/score.service';
import { ThemesService } from '../../services/themes.service';
import { UserServicesService } from '../../services/user-services.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {

  dataFiltered: any[] = []

  
  constructor(
              private scoreService: ScoreService,
              ) {
                this.getHighestScores()
  }

  ngOnInit(): void {
  }
  
  charg = true
  
  highestScores: any[] = []

  getHighestScores(){
    return this.scoreService.getHighestScores()
    .subscribe(
      res => {
        this.charg = false
        console.log(res.data)
        this.highestScores = res.data
      }
      )
    }
    
  obs = false
  search = (title: string) => {
    this.dataFiltered = this.highestScores.filter((arr: any) => arr.tema.title?.toLowerCase().includes(title.toLowerCase()) || arr.scores.find((x: any) => x.user.user.includes(title.toLowerCase())))     
    if (title.length > 0) {
      this.obs = true
    }

  }
}
