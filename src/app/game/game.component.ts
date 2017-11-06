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
    this.game = new Game(this.game.players);
    console.log('Starting Game...');
    console.log(this.game);

    this.saveGame();
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
            title: 'We have a WINNER!!',
            content: this.game.winner.name + ' is the new EMPEROR',
            actions: [
              { text: 'Ok', primary: true }
            ],
            width: 450,
            height: 200,
            minWidth: 250
          });
          this.updateGame(this.route.snapshot.params['id']);
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

  private saveGame() {
    delete this.game._id;
    const self = this;
    this.gameService.save(this.game).then((result) => {
      this.snackBar.open('The game has been created succesfully', 'close', {
        duration: 5000,
        extraClasses: ['success-snackbar']
      });
      const id = result['_id'];
      self.game = result;
      self.hasWinner = false;
      this.router.navigate(['/game', id]);
    });
  }

  private updateGame(id) {
    console.log('Updating Game...');
    console.log(this.game);
    this.gameService.update(id, this.game).then((result) => {
      this.snackBar.open('The game has been updated successfully', 'close', {
        duration: 5000,
        extraClasses: ['success-snackbar']
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
        this.snackBar.open(currentWinner.name + ' won the round ' + (this.game.rounds.length + 1), 'close', {
          duration: 5000,
          extraClasses: ['default-snackbar']
        });
      }
    }

    if (currentWinner) {
      currentWinner.wonRounds = currentWinner.wonRounds || 0;
      currentWinner.wonRounds++;
      this.currentRound.winner = currentWinner;
      this.hasWinner = currentWinner.wonRounds === this.roundsToWin;
    }
  }

}
