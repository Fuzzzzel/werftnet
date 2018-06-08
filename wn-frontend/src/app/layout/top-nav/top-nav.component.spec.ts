import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing'

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { TopNavComponent } from './top-nav.component'
import { UserService } from '../../user/user.service'
import { UtilService } from '../../core/util.service'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';

describe('TopNavComponent', () => {
  let component: TopNavComponent
  let fixture: ComponentFixture<TopNavComponent>
  let backend: HttpTestingController

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TopNavComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: 'login',
            redirectTo: ''
          },
          {
            path: 'logout',
            redirectTo: ''
          }
        ]),
        SharedModule,
        NgbDropdownModule.forRoot()
      ],
      providers: [
        UtilService,
        UserService
      ]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    backend = TestBed.get(HttpTestingController)
    fixture = TestBed.createComponent(TopNavComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should evaluate user role', () => {
    const hasRole = component.userHasRole('ROLE_USER')
    expect(hasRole).toBeFalsy()
  })

  it('should not have a logged in user on creation', () => {
    expect(component.isUserLoggedIn()).toBeFalsy()
  })

  it('should logout user', fakeAsync(() => {
    component.logoutUser()
    tick()

    const req = backend.expectOne('/logout')
    expect(req.request.method).toBe("GET")
    req.flush(null, { status: 200, statusText: 'OK' })
  }))

  it('should fail to logout user (404)', fakeAsync(() => {
    component.logoutUser()
    tick()

    spyOn(window, 'alert').and.returnValue(true)
    const req = backend.expectOne('/logout')
    expect(req.request.method).toBe("GET")
    req.flush(null, { status: 404, statusText: 'Not Found' })
  }))
})
