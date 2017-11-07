import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockBackend } from '@angular/http/testing';

import {
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';

import { MatSnackBarModule } from '@angular/material';

import { ParameterService } from './parameter.service';

describe('ParameterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
      ],
      providers: [
        ParameterService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  it('should be created', inject([ParameterService], (service: ParameterService) => {
    expect(service).toBeTruthy();
  }));

  it('should return a Promise<Array<Parameter>>',
    inject([ParameterService, XHRBackend], (service: ParameterService, mockBackend: MockBackend) => {

      const mockResponse = {
        data: [
          { _id: 0, name: 'Parameter 0', value: 'Value 0' },
          { _id: 1, name: 'Parameter 1', value: 'Value 1' },
          { _id: 2, name: 'Parameter 2', value: 'Value 2' },
          { _id: 3, name: 'Parameter 3', value: 'Value 3' },
        ]
      };

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      service.getAll().then((parameter) => {
        expect(parameter.length).toBe(4);
        expect(parameter[0].name).toEqual('Parameter 0');
        expect(parameter[0].value).toEqual('Value 0');
        expect(parameter[1].name).toEqual('Parameter 1');
        expect(parameter[1].value).toEqual('Value 1');
        expect(parameter[2].name).toEqual('Parameter 2');
        expect(parameter[2].value).toEqual('Value 2');
        expect(parameter[3].name).toEqual('Parameter 3');
        expect(parameter[3].value).toEqual('Value 3');
      });

    }));
});
