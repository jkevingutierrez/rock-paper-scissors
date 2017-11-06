import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ParameterService } from './parameter.service';

describe('ParameterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ParameterService]
    });
  });

  it('should be created', inject([ParameterService], (service: ParameterService) => {
    expect(service).toBeTruthy();
  }));
});
