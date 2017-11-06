import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseEntity } from '../entities/base-entity';

@Injectable()
export abstract class BaseService {

  protected baseUrl = '/';

  constructor(protected http: HttpClient) { }

  getAll(): Promise<BaseEntity[]> {
    return this.http.get(this.baseUrl)
      .toPromise()
      .catch(this.handleError);
  }

  get(id: string): Promise<BaseEntity> {
    return this.http.get(this.baseUrl + '/' + id)
      .toPromise()
      .catch(this.handleError);
  }

  save(movement: BaseEntity): Promise<BaseEntity> {
    return this.http.post(this.baseUrl, movement)
      .toPromise()
      .catch(this.handleError);
  }

  update(id: string, movement: BaseEntity): Promise<BaseEntity> {
    return this.http.put(this.baseUrl + '/' + id, movement)
      .toPromise()
      .catch(this.handleError);
  }

  delete(id: string): Promise<void> {
    return this.http.delete(this.baseUrl + '/' + id)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  protected handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
