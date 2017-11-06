import 'rxjs/add/operator/toPromise';

import { HttpClient } from '@angular/common/http';

import { BaseService } from '../base-service';
import { Game } from '../../entities/game';

export class GameService extends BaseService {

  protected baseUrl = '/game';

  getAll(): Promise<Game[]> {
    return super.getAll()
      .then(response => response as Game[]);
  }

  get(id: string): Promise<Game> {
    return super.get(id)
      .then(response => response as Game);
  }

  save(movement: Game): Promise<Game> {
    return super.save(movement)
      .then(response => response as Game);
  }

  update(id: string, movement: Game): Promise<Game> {
    return super.update(id, movement)
      .then(response => response as Game);
  }

}
