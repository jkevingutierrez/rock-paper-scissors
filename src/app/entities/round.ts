import { BaseEntity } from './base-entity';
import { Player } from './player';

export class Round extends BaseEntity {

  constructor(public moves: string[] = [], public winner: Player = null) {
    super();
  }
}
