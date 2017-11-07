import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockBackend } from '@angular/http/testing';

import {
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';

import { MatSnackBarModule } from '@angular/material';

import { MovementService } from './movement.service';

describe('MovementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule
      ],
      providers: [
        MovementService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  it('should be created', inject([MovementService], (service: MovementService) => {
    expect(service).toBeTruthy();
  }));

  it('should return a Promise<Array<Movement>>',
    inject([MovementService, XHRBackend], (service: MovementService, mockBackend: MockBackend) => {

      const mockResponse = {
        data: [
          { _id: 0, name: 'Movement 0', kills: 'Kills 0' },
          { _id: 1, name: 'Movement 1', kills: 'Kills 1' },
          { _id: 2, name: 'Movement 2', kills: 'Kills 2' },
          { _id: 3, name: 'Movement 3', kills: 'Kills 3' },
        ]
      };

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      service.getAll().then((parameter) => {
        expect(parameter.length).toBe(4);
        expect(parameter[0].name).toEqual('Movement 0');
        expect(parameter[0].kills).toEqual('Kills 0');
        expect(parameter[1].name).toEqual('Movement 1');
        expect(parameter[1].kills).toEqual('Kills 1');
        expect(parameter[2].name).toEqual('Movement 2');
        expect(parameter[2].kills).toEqual('Kills 2');
        expect(parameter[3].name).toEqual('Movement 3');
        expect(parameter[3].kills).toEqual('Kills 3');
      });

    }));
});
