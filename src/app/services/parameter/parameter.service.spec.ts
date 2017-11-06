import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MatSnackBarModule } from '@angular/material';

import { ParameterService } from './parameter.service';

describe('ParameterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
      ],
      providers: [ParameterService]
    });
  });

  it('should be created', inject([ParameterService], (service: ParameterService) => {
    expect(service).toBeTruthy();
  }));
});
