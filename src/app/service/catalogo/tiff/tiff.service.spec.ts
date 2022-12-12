import { TestBed } from '@angular/core/testing';

import { TiffService } from './tiff.service';

describe('TiffService', () => {
  let service: TiffService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiffService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
