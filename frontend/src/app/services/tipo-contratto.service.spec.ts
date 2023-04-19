import { TestBed } from '@angular/core/testing';

import { TipoContrattoService } from './tipo-contratto.service';

describe('TipoContrattoService', () => {
  let service: TipoContrattoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoContrattoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
