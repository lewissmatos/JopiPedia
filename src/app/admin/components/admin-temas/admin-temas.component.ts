import { Component, OnInit } from '@angular/core';
import { cardData } from 'src/app/dashboard/Models/cardData.model';
import { ThemesService } from 'src/app/dashboard/services/themes.service';

@Component({
  selector: 'app-admin-temas',
  templateUrl: './admin-temas.component.html',
  styleUrls: ['./admin-temas.component.scss']
})
export class AdminTemasComponent implements OnInit {

  allThemes: cardData[] = []
  data: cardData = {

  }
  constructor(private tService: ThemesService) {
    this.getAllThemes()
  }

  ngOnInit(): void {
  }

  getAllThemes() {
    this.tService.getAllThemes()
      .subscribe(
        res => {
          this.allThemes = res.data
      }, error =>  console.log(error)
    )
  }

}
