import { BaseEntity } from './base-entity';

export class Movement extends BaseEntity {

  constructor(public name: string, public kills: string = null, public isNew: boolean = false) {
    super();
  }
}
