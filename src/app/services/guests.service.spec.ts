import { TestBed, inject } from '@angular/core/testing';

import { GuestsService } from './guests.service';

describe('GuestsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GuestsService]
    });
  });

  it('should be created', inject([GuestsService], (service: GuestsService) => {
    expect(service).toBeTruthy();
  }));
});
