import { BaseEntity } from './base-entity';
import { Player } from './player';
import { Round } from './round';

export class Game extends BaseEntity {

  public _id: string;

  constructor(public players: Player[] = [], public rounds: Round[] = [], public winner: Player = null) {
    super();
  }
}
