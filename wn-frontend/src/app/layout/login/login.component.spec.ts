import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing'

import { LoginComponent } from './login.component'
import { UserService } from '../../user/user.service'
import { UtilService } from '../../core/util.service'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { User } from '../../user/user.model'
import { RouterTestingModule } from '@angular/router/testing'
import { SharedModule } from '../../shared/shared.module'

describe('LoginComponent', () => {
  let backend: HttpTestingController
  let component: LoginComponent
  let fixture: ComponentFixture<LoginComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: 'login',
            redirectTo: ''
          },
          {
            path: 'home',
            redirectTo: ''
          }
        ])
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
    fixture = TestBed.createComponent(LoginComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should send login request and succeed',
    async(() => {
      let user = new User()
      user.id = 1

      const compiled = fixture.debugElement.nativeElement
      compiled.querySelector('#username').text = 'testuser'
      compiled.querySelector('#password').text = 'testpass'
      compiled.querySelector('#login_button').click()


      const req = backend.expectOne('/login_check')
      expect(req.request.method).toBe("POST")
      req.flush(user, { status: 200, statusText: 'Ok' })
    })
  )

  it('should send login request and fail',
    async(() => {
      let user = new User()
      user.id = 1

      const compiled = fixture.debugElement.nativeElement
      compiled.querySelector('#username').text = 'testuser'
      compiled.querySelector('#password').text = 'testpass'
      compiled.querySelector('#login_button').click()


      const req = backend.expectOne('/login_check')
      expect(req.request.method).toBe("POST")
      req.flush(user, { status: 401, statusText: 'Not Authorized' })
    })
  )
})
