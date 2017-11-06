import { BaseEntity } from './base-entity';

export class Parameter extends BaseEntity {

  public _id: string;

  constructor(public name: string, public value) {
    super();
  }

}
