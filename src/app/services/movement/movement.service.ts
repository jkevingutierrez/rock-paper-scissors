import 'rxjs/add/operator/toPromise';

import { BaseService } from '../base-service';
import { Movement } from '../../entities/movement';

export class MovementService extends BaseService {

  protected baseUrl = '/movement';

  getAll(): Promise<Movement[]> {
    return super.getAll()
      .then(response => response as Movement[]);
  }

  get(id: string): Promise<Movement> {
    return super.get(id)
      .then(response => response as Movement);
  }

  save(movement: Movement): Promise<Movement> {
    return super.save(movement)
      .then(response => response as Movement);
  }

  update(id: string, movement: Movement): Promise<Movement> {
    return super.update(id, movement)
      .then(response => response as Movement);
  }
}
