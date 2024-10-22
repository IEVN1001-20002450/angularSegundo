import { TestBed } from '@angular/core/testing';

import { MessageservService } from './messageserv.service';

describe('MessageservService', () => {
  let service: MessageservService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageservService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
