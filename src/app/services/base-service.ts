import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MatSnackBar } from '@angular/material';

import { BaseEntity } from '../entities/base-entity';
import { Constants } from '../constants';


@Injectable()
export abstract class BaseService {

  protected baseUrl = '/';

  constructor(protected http: HttpClient, protected snackBar: MatSnackBar) { }

  getAll(): Promise<Object | BaseEntity[]> {
    return this.http.get(Constants.ROOT_URL + this.baseUrl)
      .toPromise()
      .catch(this.handleError.bind(this));
  }

  get(id: string): Promise<BaseEntity> {
    return this.http.get(Constants.ROOT_URL + this.baseUrl + '/' + id)
      .toPromise()
      .catch(this.handleError.bind(this));
  }

  save(movement: BaseEntity): Promise<BaseEntity> {
    return this.http.post(Constants.ROOT_URL + this.baseUrl, movement)
      .toPromise()
      .catch(this.handleError.bind(this));
  }

  update(id: string, movement: BaseEntity): Promise<BaseEntity> {
    return this.http.put(Constants.ROOT_URL + this.baseUrl + '/' + id, movement)
      .toPromise()
      .catch(this.handleError.bind(this));
  }

  delete(id: string): Promise<void> {
    return this.http.delete(Constants.ROOT_URL + this.baseUrl + '/' + id)
      .toPromise()
      .then(() => null)
      .catch(this.handleError.bind(this));
  }

  protected handleError(error: any): Promise<any> {
    let message = 'An error ocurred: ';
    if (error.error && error.error.errmsg) {
      message += error.error.errmsg;
    } else {
      message += error.message;
    }
    if (message.length > 200) {
      message = message.substring(0, 200) + '...';
    }
    this.snackBar.open(message, Constants.CLOSE_MESSAGE, {
      duration: Constants.POPUPS_TIME,
      extraClasses: [Constants.ERROR_SNACKBAR_CLASS]
    });

    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
