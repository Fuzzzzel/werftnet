import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing'
import { AppComponent } from './app.component'
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { UserService } from './user/user.service'
import { UtilService } from './core/util.service'
import { CoreDataService } from './core/core-data.service'
import { CoreDataServiceMock } from './core/core-data.service-mock'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'
import { TopNavComponent } from './layout/top-nav/top-nav.component'
import { User } from './user/user.model'
import { SharedModule } from './shared/shared.module';
import { NgxUiLoaderService, NgxUiLoaderModule } from 'ngx-ui-loader';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>
  let component: any
  let backend: HttpTestingController
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TopNavComponent
      ],
      imports: [
        NgxUiLoaderModule,
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
        ]),
        NgbDropdownModule.forRoot()
      ],
      providers: [
        CoreDataService,
        UserService,
        UtilService,
        { provide: CoreDataService, useClass: CoreDataServiceMock }
      ]
    }).compileComponents()
    backend = TestBed.get(HttpTestingController)
    fixture = TestBed.createComponent(AppComponent)
    component = fixture.debugElement.componentInstance
    spyOn(component.ngxUiLoaderService, 'start').and.returnValue(true)
    spyOn(component.ngxUiLoaderService, 'stop').and.returnValue(true)
    tick()
  }))

  afterEach(() => {
    fixture.destroy()
  })

  /**
   * Test if the App can be created
   */
  it('should create the component', fakeAsync(() => {
    expect(component).toBeTruthy()
    fixture.detectChanges()
    const coreDataService = TestBed.get(CoreDataService)
  }))

  it('should no user be logged in on init', fakeAsync(() => {
    fixture.detectChanges()
    expect(component.isUserLoggedIn()).toBeFalsy()
    expect(component.userHasRole('ROLE_USER')).toBeFalsy()
  }))

  it('should fail to auto login', fakeAsync(() => {
    fixture.detectChanges()
    spyOn(window, 'alert').and.returnValue(true)
    tick()
    const req = backend.expectOne('/get_logged_in_user')
    expect(req.request.method).toBe("GET")
    req.flush(null, { status: 404, statusText: '404 Not Found' })
  }))



  /**
   * Test if the title is displayed correctly
   */
  it(`should have as title 'WerftNET Version X.Y'`, async(() => {
    fixture.detectChanges()
    expect(component.title).toEqual('WerftNET Version ' + component.version)
  }))

  it('should test for a user logged in', fakeAsync(() => {
    fixture.detectChanges()
    tick()

    const req = backend.expectOne('/get_logged_in_user')
    expect(req.request.method).toBe("GET")

    let user = new User()
    user.id = 1
    user.username = 'testuser'
    user.roles = ['ROLE_USER']
    req.flush(user, { status: 200, statusText: 'Ok' })

    expect(component.isUserLoggedIn()).toBeTruthy()
    expect(component.userHasRole('ROLE_USER')).toBeTruthy()
  }))
})
