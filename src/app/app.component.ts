import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfigService } from './app.service';
import { DetailsDialogComponent } from './details-dialog/details-dialog.component';
import { Game } from './entities/game';
import { GameDetail } from './entities/GameDetail';
import { TopGames } from './entities/TopGames';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'e2vr-test-Amel-AZZI';
  popularGames: TopGames
  headers: any;
  gameDetail: GameDetail
  games: Game[]
  page = 1

  
  constructor(private dataService: ConfigService, private gameDetailsDialog: MatDialog){}

  handlePageChange(event) {
    this.page = event;
    this.getData()
  }

  ngOnInit(){
    this.getData()
  }

  getData(){
    this.dataService.getPopularGames()
    .subscribe(resp => {

      const keys = resp.headers.keys();
      this.headers = keys.map(key =>
        `${key}: ${resp.headers.get(key)}`);

      this.popularGames = {
        count: resp.body.count,
        headers: resp.body.headers,
        next: resp.body.headers,
        previous: resp.body.previous,
        results: resp.body.results,
      };
      this.games = this.popularGames.results 
    });
  }

  getDetail(id: number){
    this.dataService.getGameDetails(id)
    .subscribe(resp => {
      this.gameDetail = {
        id: resp.body.id,
        name: resp.body.name,
        description: resp.body.description
      };
      this.showGameDetails()
    });
  }

  showGameDetails(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {title: this.gameDetail.name, description: this.gameDetail.description}
    dialogConfig.width =" 50%"
    this.gameDetailsDialog.open(DetailsDialogComponent, dialogConfig);
  }

}
