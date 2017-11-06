import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GameService } from '../services/game/game.service';
import { Game } from '../entities/game';
import { Player } from '../entities/player';
import { RankingElement } from '../entities/ranking-element';


@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

  games: Game[];
  ranking: RankingElement[];

  constructor(private gameService: GameService, private router: Router, private route: ActivatedRoute) {
    this.games = [];
    this.ranking = [];
   }

  ngOnInit() {
    this.getGames();
  }

  private getGames() {
    this.gameService.getAll().then((res) => {
      this.games = res;
      const counts = this.games.reduce(function (playerCounts, currentGame) {
        if (currentGame.winner) {
          if (typeof playerCounts[currentGame.winner.name] !== 'undefined') {
            playerCounts[currentGame.winner.name]++;
          } else {
            playerCounts[currentGame.winner.name] = 1;
          }
        }
        return playerCounts;
      }, {});

      for (const key in counts) {
        if (counts.hasOwnProperty(key)) {
          const player = new Player(key);
          const wonGames = new RankingElement(player, counts[key]);
          this.ranking.push(wonGames);
        }
      }

    });


  }

}
