import { TestBed } from '@angular/core/testing';

import { ServerurlService } from './serverurl.service';

describe('ServerurlService', () => {
  let service: ServerurlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerurlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
