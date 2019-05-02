import { TestBed, async, inject } from '@angular/core/testing';

import { KntschemeGuard } from './kntscheme.guard';

describe('KntschemeGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KntschemeGuard]
    });
  });

  it('should ...', inject([KntschemeGuard], (guard: KntschemeGuard) => {
    expect(guard).toBeTruthy();
  }));
});
