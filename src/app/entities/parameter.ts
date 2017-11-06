import { BaseEntity } from './base-entity';

export class Parameter extends BaseEntity {

  constructor(public name: string, public value) {
    super();
  }

}
