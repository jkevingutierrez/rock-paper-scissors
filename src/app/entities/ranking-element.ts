import { BaseEntity } from './base-entity';
import { Player } from './player';

export class RankingElement extends BaseEntity {

  constructor(public player: Player, public wonGames: number = 0) {
    super();
  }
}
