import { TestBed } from '@angular/core/testing';

import { QualificatifService } from './qualificatif.service';

describe('QualificatifService', () => {
  let service: QualificatifService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QualificatifService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
