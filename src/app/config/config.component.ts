import { Component, OnInit } from '@angular/core';

import { DialogService, DialogRef, DialogCloseResult } from '@progress/kendo-angular-dialog';

import { MatSnackBar } from '@angular/material';

import { MovementService } from '../services/movement/movement.service';
import { ParameterService } from '../services/parameter/parameter.service';
import { Parameter } from '../entities/parameter';
import { Movement } from '../entities/movement';
import { Constants } from '../constants';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  parameters: Parameter[];
  movements: Movement[];

  constructor(
    private movementService: MovementService,
    private parameterService: ParameterService,
    private dialogService: DialogService,
    private snackBar: MatSnackBar) {
      this.parameters = [];
      this.movements = [];
   }

  ngOnInit() {
    this.getParameters();
    this.getMovements();
  }

  addMovement() {
    const movement = new Movement('', '', true);
    this.movements.push(movement);
  }

  deleteMovement(id: string, movement: Movement, index: number) {
    const self = this;
    if (id) {
      const dialog: DialogRef = this.dialogService.open({
        title: Constants.CONFIRM_MESSAGE,
        content: 'You\'re going to delete a movement. Are you sure?',
        actions: [
          { text: 'No' },
          { text: 'Yes', primary: true }
        ],
        width: Constants.POPUPS_WIDTH,
        height: Constants.POPUPS_HEIGHT,
        minWidth: Constants.POPUPS_MIN_WIDTH
      });

      dialog.result.subscribe((result) => {
        if (result instanceof DialogCloseResult) {
        } else {
          if (result['primary'] === true) {
            self.movements.splice(index, 1);
            this.movementService.delete(id).then((res) => {
              const message = 'The movement "' + movement.name + '" kills "' + movement.kills + '" has been deleted succesfully';
              this.snackBar.open(message, Constants.CLOSE_MESSAGE, {
                duration: Constants.POPUPS_TIME,
                extraClasses: [Constants.SUCESS_SNACKBAR_CLASS]
              });
            });
          }
        }
      });
    } else {
      self.movements.splice(index, 1);
    }
  }

  saveMovement(id: string, movement: Movement, index: number) {
    const self = this;
    const otherEqualMovement = this.movements.find((otherMovement, otherIndex) => {
      return otherMovement.name === movement.name && otherMovement.kills === movement.kills && index !== otherIndex;
    });

    if (typeof otherEqualMovement !== 'undefined') {
      if (movement.isNew) {
        this.movementService.save(movement).then((res) => {
          const message = 'The movement "' + movement.name + '" kills "' + movement.kills + '" has been created succesfully';
          self.movements[index] = res;
          this.snackBar.open(message, Constants.CLOSE_MESSAGE, {
            duration: Constants.POPUPS_TIME,
            extraClasses: [Constants.SUCESS_SNACKBAR_CLASS]
          });
        });
      } else {
        this.movementService.update(id, movement).then((res) => {
          self.movements[index] = res;
          const message = 'The movement "' + movement.name + '" kills "' + movement.kills + '" has been updated succesfully';
          this.snackBar.open(message, Constants.CLOSE_MESSAGE, {
            duration: Constants.POPUPS_TIME,
            extraClasses: [Constants.SUCESS_SNACKBAR_CLASS]
          });
        });
      }
    } else {
      const message = 'The movement "' + movement.name + '" kills "' + movement.kills + '" already exists.';
      this.snackBar.open(message, Constants.CLOSE_MESSAGE, {
        duration: Constants.POPUPS_TIME,
        extraClasses: [Constants.ERROR_SNACKBAR_CLASS]
      });
    }
  }

  saveParameter(id: string, parameter: Parameter, index) {
    const self = this;
    this.parameterService.update(id, parameter).then((res) => {
      self.parameters[index] = res;
      this.snackBar.open('The parameter "' + parameter.name + '" has been updated succesfully', Constants.CLOSE_MESSAGE, {
        duration: Constants.POPUPS_TIME,
        extraClasses: [Constants.SUCESS_SNACKBAR_CLASS]
      });
    });
  }

  private getMovements() {
    this.movementService.getAll().then((res) => {
      this.movements = res;
    });
  }

  private getParameters() {
    this.parameterService.getAll().then((res) => {
      this.parameters = res;
    });
  }

}
