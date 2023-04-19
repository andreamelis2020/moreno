import { TestBed } from '@angular/core/testing';

import { CampagnaService } from './campagna.service';

describe('CampagnaService', () => {
  let service: CampagnaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CampagnaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
