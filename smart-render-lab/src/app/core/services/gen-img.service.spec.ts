import { TestBed } from '@angular/core/testing';

import { GenImgService } from './gen-img.service';

describe('GenImgService', () => {
  let service: GenImgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenImgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
