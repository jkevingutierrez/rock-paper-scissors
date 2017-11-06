import { Component, OnInit } from '@angular/core';

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

  constructor(private movementService: MovementService, private parameterService: ParameterService) {
    this.parameters = [];
    this.movements = [];
   }

  ngOnInit() {
    this.getParameters();
    this.getMovements();
  }

  addMovement() {
    const movement = new Movement('', '', true);
    console.log(movement);
    this.movements.push(movement);
    console.log(this.movements);
  }

  deleteMovement(id: string, movement: Movement) {
    this.movements = this.movements.filter(current => current.name !== movement.name);
    if (id) {
      this.movementService.delete(id).then((res) => {
      });
    }
  }

  saveMovement(id: string, movement: Movement) {
    if (movement.isNew) {
      this.movementService.save(movement).then((res) => {
        movement = res;
      });
    } else {
      this.movementService.update(id, movement).then((res) => {
        movement = res;
      });
    }
  }

  saveParameter(id: string, parameter: Parameter) {
    this.parameterService.update(id, parameter).then((res) => {
      parameter = res;
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
