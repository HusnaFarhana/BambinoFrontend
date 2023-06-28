import { TestBed } from '@angular/core/testing';

import { AdminBackGuard } from './admin-back.guard';

describe('AdminBackGuard', () => {
  let guard: AdminBackGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminBackGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
