import { BaseEntity } from './base-entity';

export class Movement extends BaseEntity {

  public _id: string;

  constructor(public name: string, public kills: string = null, public isNew: boolean = false) {
    super();
  }
}
