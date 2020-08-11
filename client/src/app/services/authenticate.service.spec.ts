import { TestBed, inject } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticateService } from './authenticate.service';

fdescribe('authenticateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticateService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([AuthenticateService], (service: AuthenticateService) => {
    expect(service).toBeTruthy();
  }));

  it('bla', inject([AuthenticateService], (service: AuthenticateService) => {
    service.login('leo', '123');
  }));
});
