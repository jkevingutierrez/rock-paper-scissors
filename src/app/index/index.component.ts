import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material';

import { GameService } from '../services/game/game.service';
import { ParameterService } from '../services/parameter/parameter.service';
import { Player } from '../entities/player';
import { Game } from '../entities/game';
import { Constants } from '../constants';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  players: Player[];
  game: Game;
  numberOfPlayers: number;

  constructor(
    private gameService: GameService,
    private parameterService: ParameterService,
    private router: Router,
    private snackBar: MatSnackBar) {
      this.game = new Game();
      this.players = [];
      this.numberOfPlayers = 2;
   }

  ngOnInit() {
    this.initParameters();
  }

  startGame() {
    this.game = new Game(this.players);
    console.log('Starting Game...');
    console.log(this.game);

    this.saveGame();
  }

  private initParameters() {
    this.initPlayers();
    this.getNumberOfPlayers();
  }

  private initPlayers() {
    this.players = [];
    for (let index = 1; index <= this.numberOfPlayers; index++) {
      this.players.push(new Player('Player ' + index));
    }
  }

  private getNumberOfPlayers() {
    const parameterName = 'Number of players';
    this.parameterService.getByName(parameterName).then((res) => {
      console.log(parameterName);
      console.log(res);
      this.numberOfPlayers = +res.value;
      this.initPlayers();
    });
  }

  private saveGame() {
    this.gameService.save(this.game).then((result) => {
      const id = result['_id'];
      this.snackBar.open('The game with id "' + id + '" has been created succesfully', 'close', {
        duration: Constants.POPUPS_TIME,
        extraClasses: [Constants.SUCESS_SNACKBAR_CLASS]
      });
      this.router.navigate(['/game', id]);
    });
  }

}
