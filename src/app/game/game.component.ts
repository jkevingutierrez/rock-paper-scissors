import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DialogService } from '@progress/kendo-angular-dialog';

import { MatSnackBar } from '@angular/material';

import { GameService } from '../services/game/game.service';
import { MovementService } from '../services/movement/movement.service';
import { ParameterService } from '../services/parameter/parameter.service';
import { Game } from '../entities/game';
import { Round } from '../entities/round';
import { Movement } from '../entities/movement';
import { Player } from '../entities/player';
import { Constants } from '../constants';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  game: Game;
  movements: Movement[];
  movementNames: string[];
  currentRound: Round;
  currentMoveName: string;
  currentIndex: number;
  hasWinner: boolean;
  roundsToWin: number;

  constructor(
    private gameService: GameService,
    private movementService: MovementService,
    private parameterService: ParameterService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private snackBar: MatSnackBar) {
      this.currentIndex = 0;
      this.roundsToWin = 3;
      this.currentRound = new Round();
      this.hasWinner = false;
      this.movementNames = [];
      this.movements = [];
  }

  ngOnInit() {
    this.initParameters();
    this.getGame(this.route.snapshot.params['id']);
    this.getMovements();
  }

  newGame() {
    this.router.navigate(['/']);
  }

  playMove() {
    if (!this.hasWinner) {
      if (this.currentMoveName) {
        this.currentRound.moves.push(this.currentMoveName);
      }

      if (this.currentIndex === (this.game.players.length - 1)) {
        this.validateWinner();
        this.game.rounds.push(this.currentRound);

        if (this.hasWinner) {
          this.game.winner = this.currentRound.winner;
          this.dialogService.open({
            title: Constants.WINNER_TITLE,
            content: this.game.winner.name + ' is the new EMPEROR',
            actions: [
              { text: 'Ok', primary: true }
            ],
            width: Constants.POPUPS_WIDTH,
            height: Constants.POPUPS_HEIGHT,
            minWidth: Constants.POPUPS_MIN_WIDTH
          });
          this.finishGame(this.route.snapshot.params['id']);
        }

        this.currentIndex = 0;
        this.currentRound = new Round();
      } else {
        this.currentIndex++;
      }
      this.currentMoveName = '';
    }
  }

  private initParameters() {
    this.getRoundsToWin();
  }

  private getRoundsToWin() {
    const parameterName = 'Rounds to win';
    this.parameterService.getByName(parameterName).then((res) => {
      console.log(parameterName);
      console.log(res);
      this.roundsToWin = +res.value;
    });
  }

  private getGame(id) {
    this.gameService.get(id).then((res) => {
      this.game = res || new Game();

      if (this.game.winner && this.game.winner.name) {
        this.hasWinner = true;
      }
    });
  }

  private getMovements() {
    this.movementService.getAll().then((res) => {
      this.movements = res;
      this.movementNames = this.movements.map(movement => movement.name);
    });
  }

  private finishGame(id) {
    console.log('Finishing Game...');
    console.log(this.game);
    this.gameService.update(id, this.game).then((result) => {
      this.snackBar.open('The game with id "' + id + '" has finished', Constants.CLOSE_MESSAGE, {
        duration: Constants.POPUPS_TIME,
        extraClasses: [Constants.SUCESS_SNACKBAR_CLASS]
      });
    });
  }

  private validateWinner() {
    const movesLength = this.currentRound.moves.length;
    let currentWinner: Player = null;

    for (let i = 0; i < movesLength; i++) {
      let isWinner = true;
      const findMovement = this.movements.find(movement => movement.name === this.currentRound.moves[i]);
      const currentPlayer = this.game.players[i];

      for (let j = 0; j < movesLength && isWinner; j++) {
        const otherMoveName = this.currentRound.moves[j];
        if (i !== j && findMovement.kills !== otherMoveName) {
          isWinner = false;
        }
      }

      if (isWinner) {
        currentWinner = currentPlayer;
      }
    }

    if (currentWinner) {
      this.snackBar.open(currentWinner.name +
        ' won round ' + (this.game.rounds.length + 1) +
        '. ' + this.currentRound.moves.join(' vs '),
        Constants.CLOSE_MESSAGE, {
          duration: Constants.POPUPS_TIME,
          extraClasses: [Constants.DEFAULT_SNACKBAR_CLASS]
        });

      currentWinner.wonRounds = currentWinner.wonRounds || 0;
      currentWinner.wonRounds++;
      this.currentRound.winner = currentWinner;
      this.hasWinner = currentWinner.wonRounds === this.roundsToWin;
    } else {
      this.snackBar.open('Draw in round ' + (this.game.rounds.length + 1) +
        '. ' + this.currentRound.moves.join(' vs '),
        Constants.CLOSE_MESSAGE, {
          duration: Constants.POPUPS_TIME,
          extraClasses: [Constants.DEFAULT_SNACKBAR_CLASS]
        });
    }
  }

}
