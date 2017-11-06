import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MatSnackBarModule } from '@angular/material';

import { MovementService } from './movement.service';

describe('MovementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule
      ],
      providers: [MovementService]
    });
  });

  it('should be created', inject([MovementService], (service: MovementService) => {
    expect(service).toBeTruthy();
  }));
});
