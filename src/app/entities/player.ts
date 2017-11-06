import { BaseEntity } from './base-entity';

export class Player extends BaseEntity {

  constructor(public name: string, public wonRounds: number = 0) {
    super();
  }
}
