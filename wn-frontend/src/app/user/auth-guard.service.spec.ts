import { TestBed, inject } from '@angular/core/testing'

import { AuthGuardService } from './auth-guard.service'
import { UserService } from './user.service'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { UtilService } from '../core/util.service'
import { RouterTestingModule } from '@angular/router/testing'

describe('AuthGuardService', () => {
  let mockSnapshot = jasmine.createSpyObj("RouterStateSnapshot", ['toString'])
  mockSnapshot.data = {
    expectedRole: 'ROLE_USER'
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: 'login',
            redirectTo: ''
          }
        ])
      ],
      providers: [
        AuthGuardService,
        UserService,
        UtilService
      ]
    })
  })

  it('should be created', inject([AuthGuardService], (service: AuthGuardService) => {
    expect(service).toBeTruthy()
  }))

  it('should return not activated, when no user is logged in', inject([AuthGuardService], (authGuardService: AuthGuardService) => {
    expect(authGuardService.canActivate(mockSnapshot)).toBeFalsy()
  }))
})
