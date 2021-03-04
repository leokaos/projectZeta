import { TestBed, inject } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthenticateService } from './authenticate.service';

describe('authenticateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticateService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([AuthenticateService], (service: AuthenticateService) => {
    expect(service).toBeTruthy();
  }));

  it('should make a login call', inject([HttpTestingController, AuthenticateService], (httpMock: HttpTestingController, service: AuthenticateService) => {

    service.login('leo', '123').subscribe(data => {
      expect(data.token).not.toBeNull();
    });

    const req = httpMock.expectOne('http://localhost:8090/oauth/token?username=leo&password=123&grant_type=password&client_id=client');
    expect(req.request.method).toEqual('POST');

    req.flush({ 'token': 'abc' });
  }));

});
