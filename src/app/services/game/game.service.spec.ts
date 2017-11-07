import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockBackend } from '@angular/http/testing';

import {
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';

import { MatSnackBarModule } from '@angular/material';

import { GameService } from './game.service';

describe('GameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule
      ],
      providers: [
        GameService,
        { provide: XHRBackend, useClass: MockBackend }]
    });
  });

  it('should be created', inject([GameService], (service: GameService) => {
    expect(service).toBeTruthy();
  }));

  it('should return a Promise<Array<Game>>',
    inject([GameService, XHRBackend], (service: GameService, mockBackend: MockBackend) => {

      const mockResponse = {
        data: [
          { _id: 0, players: [{ name: 'Player 0' }]},
          { _id: 1, players: [{ name: 'Player 1' }] },
          { _id: 2, players: [{ name: 'Player 2' }] },
          { _id: 3, players: [{ name: 'Player 3' }] },
        ]
      };

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      service.getAll().then((game) => {
        expect(game.length).toBe(4);
        expect(game[0].players[0].name).toEqual('Player 0');
        expect(game[1].players[0].name).toEqual('Player 1');
        expect(game[2].players[0].name).toEqual('Player 2');
        expect(game[3].players[0].name).toEqual('Player 3');
      });

    }));
});
