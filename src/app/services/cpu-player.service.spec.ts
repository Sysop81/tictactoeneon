import { TestBed } from '@angular/core/testing';

import { CpuPlayerService } from './cpu-player.service';

describe('CpuPlayerService', () => {
  let service: CpuPlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CpuPlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
