import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user/user.service';
import { UtilService } from './core/util.service';
import { CoreDataService } from './core/core-data.service';
import { TopNavComponent } from './layout/top-nav/top-nav.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TopNavComponent
      ],
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
        CoreDataService,
        UserService,
        UtilService
      ]
    }).compileComponents();
  }));

  /**
   * Test if the App can be created
   */
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should no user be logged in on init', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.isUserLoggedIn()).toBeFalsy();
    expect(app.userHasRole('ROLE_USER')).toBeFalsy();
  })

  /**
   * Test if the title is displayed correctly
   */
  it(`should have as title 'WerftNET Version 1.1'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('WerftNET Version 1.1');
  }));

  /**
   * Test if the title is shown in an h1 tag on the component
   * 
   * Skipped, since loading text is shown instead
   */
  xit('should render title in a tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#version-info').textContent).toContain('WerftNET Version 1.1');
  }));
});
