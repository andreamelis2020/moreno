import { TestBed } from '@angular/core/testing';

import { TipoOffertaService } from './tipo-offerta.service';

describe('TipoOffertaService', () => {
  let service: TipoOffertaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoOffertaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
