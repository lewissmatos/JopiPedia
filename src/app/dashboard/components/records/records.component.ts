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
        this.highestScores = res.data
      }, error => console.log(error)
      )
    }
    
  obs = false
  search = (title: string) => {
    this.dataFiltered = this.highestScores.filter((x: any) => x.tema.title?.toLowerCase().includes(title.toLowerCase()))     
    if (title.length > 0) {
      this.obs = true
    }

  }
}
