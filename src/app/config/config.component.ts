import { Component, OnInit } from '@angular/core';

import { DialogService, DialogRef, DialogCloseResult } from '@progress/kendo-angular-dialog';

import { MatSnackBar } from '@angular/material';

import { MovementService } from '../services/movement/movement.service';
import { ParameterService } from '../services/parameter/parameter.service';
import { Parameter } from '../entities/parameter';
import { Movement } from '../entities/movement';

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
        title: 'Please confirm',
        content: 'You\'re going to delete a movement. Are you sure?',
        actions: [
          { text: 'No' },
          { text: 'Yes', primary: true }
        ],
        width: 450,
        height: 200,
        minWidth: 250
      });

      dialog.result.subscribe((result) => {
        if (result instanceof DialogCloseResult) {
          console.log('close');
        } else {
          if (result['primary'] === true) {
            self.movements.splice(index, 1);
            this.movementService.delete(id).then((res) => {
              this.snackBar.open('The movement "' + movement + '" has been deleted succesfully', 'close', {
                duration: 5000,
                extraClasses: ['success-snackbar']
              });
            });
          }
        }
      });
    }
  }

  saveMovement(id: string, movement: Movement) {
    if (movement.isNew) {
      this.movementService.save(movement).then((res) => {
        this.snackBar.open('The movement "' + movement.name + '" kills "' + movement.kills + '" has been created succesfully', 'close', {
          duration: 5000,
          extraClasses: ['success-snackbar']
        });
      });
    } else {
      this.movementService.update(id, movement).then((res) => {
        this.snackBar.open('The movement "' + movement.name + '" kills "' + movement.kills + '" has been updated succesfully', 'close', {
          duration: 5000,
          extraClasses: ['success-snackbar']
        });
      });
    }
  }

  saveParameter(id: string, parameter: Parameter) {
    this.parameterService.update(id, parameter).then((res) => {
      parameter = res;
      this.snackBar.open('The parameter "' + parameter.name + '" has been updated succesfully', 'close', {
        duration: 5000,
        extraClasses: ['success-snackbar']
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
