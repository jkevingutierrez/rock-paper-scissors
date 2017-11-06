import 'rxjs/add/operator/toPromise';

import { HttpClient } from '@angular/common/http';

import { BaseService } from '../base-service';
import { Parameter } from '../../entities/parameter';

export class ParameterService extends BaseService {

  protected baseUrl = '/parameter';

  getAll(): Promise<Parameter[]> {
    return super.getAll()
      .then(response => response as Parameter[]);
  }

  get(id: string): Promise<Parameter> {
    return super.get(id)
      .then(response => response as Parameter);
  }

  getByName(name: string): Promise<Parameter> {
    return this.http.get(this.baseUrl + '/name/' + name)
      .toPromise()
      .then(response => response as Parameter)
      .catch(this.handleError.bind(this));
  }

  save(movement: Parameter): Promise<Parameter> {
    return super.save(movement)
      .then(response => response as Parameter);
  }

  update(id: string, movement: Parameter): Promise<Parameter> {
    return super.update(id, movement)
      .then(response => response as Parameter);
  }

}
