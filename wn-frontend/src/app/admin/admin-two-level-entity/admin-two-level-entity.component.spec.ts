import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { AdminTwoLevelEntityComponent } from './admin-two-level-entity.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CoreDataService } from '../../core/core-data.service';
import { CoreDataServiceMock } from '../../core/core-data.service-mock';
import { UtilService } from '../../core/util.service';
import { TwoLevelEntityCollection, TwoLevelEntity } from '../../shared/model/two-level-entity.model';

describe('AdminTwoLevelEntityComponent', () => {
  let component: AdminTwoLevelEntityComponent;
  let fixture: ComponentFixture<AdminTwoLevelEntityComponent>;
  let backend: HttpTestingController

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [AdminTwoLevelEntityComponent],
      providers: [
        UtilService,
        { provide: CoreDataService, useClass: CoreDataServiceMock }
      ]
    })
      .compileComponents();
    backend = TestBed.get(HttpTestingController)
    fixture = TestBed.createComponent(AdminTwoLevelEntityComponent);
    component = fixture.componentInstance;
  }));

  it('should create and load initial data', (done) => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
    component.entityName = 'TestEntity'

    component.loadTwoLevelEntityValues()
      .then((data) => {
        expect(component.valuearray).toBeTruthy()
        done()
      })

    const req = backend.expectOne('/admin/two_level_entity/TestEntity');
    expect(req.request.method).toBe("GET");
    req.flush(new TwoLevelEntityCollection(), { status: 200, statusText: 'Ok' });
  })

  it('should create and fail to load initial data', (done) => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
    component.entityName = 'TestEntity'

    component.loadTwoLevelEntityValues()
      .catch((error) => {
        expect(error).toBeTruthy()
        done()
      })

    const req = backend.expectOne('/admin/two_level_entity/TestEntity');
    expect(req.request.method).toBe("GET");
    req.flush(null, { status: 404, statusText: '404 Not Found' });
  })

  // Main Item Tests

  it('should create two level main item', (done) => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
    component.entityName = 'TestEntity'

    component.createTwoLevelEntityMainItem('NewTestItem')
      .then((data) => {
        expect(data).toBeTruthy()
        done()
      })

    const req = backend.expectOne('/admin/two_level_entity/TestEntity');
    expect(req.request.method).toBe("POST");
    req.flush(new TwoLevelEntity(), { status: 200, statusText: 'OK' });
  })

  it('should fail to create two level main item', (done) => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
    component.entityName = 'TestEntity'

    component.createTwoLevelEntityMainItem('NewTestItem')
      .catch((error) => {
        expect(error).toBeTruthy()
        done()
      })

    const req = backend.expectOne('/admin/two_level_entity/TestEntity');
    expect(req.request.method).toBe("POST");
    req.flush(null, { status: 404, statusText: '404 Not Found' });
  })


  it('should delete two level main item', (done) => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
    component.entityName = 'TestEntity'

    spyOn(window, 'confirm').and.returnValue(true);
    component.deleteTwoLevelEntityMainItem(1)
      .then(() => {
        done()
      })
      .catch(() => { throw new Error() })

    const req = backend.expectOne('/admin/two_level_entity/TestEntity/1');
    expect(req.request.method).toBe("DELETE");
    req.flush(null, { status: 200, statusText: 'OK' });
  })

  it('should fail to delete two level main item', (done) => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
    component.entityName = 'TestEntity'

    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(window, 'alert').and.returnValue(true);
    component.deleteTwoLevelEntityMainItem(null)
      .catch((error) => {
        component.deleteTwoLevelEntityMainItem(1)
          .catch((error) => {
            done()
          })
        const req = backend.expectOne('/admin/two_level_entity/TestEntity/1');
        expect(req.request.method).toBe("DELETE");
        req.flush(null, { status: 404, statusText: '404 Not Found' });
      })
  })

  it('should update two level main item', (done) => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
    component.entityName = 'TestEntity'

    component.updateTwoLevelEntityMainItem(1, 'NewTestItem-Edited')
      .then((data) => {
        expect(data).toBeTruthy()
        done()
      })

    const req = backend.expectOne('/admin/two_level_entity/TestEntity/1');
    expect(req.request.method).toBe("POST");
    req.flush(new TwoLevelEntity(), { status: 200, statusText: 'OK' });
  })

  it('should fail to update two level main item', (done) => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
    component.entityName = 'TestEntity'

    component.updateTwoLevelEntityMainItem(1, 'NewTestItem-Edited')
      .catch((error) => {
        expect(error).toBeTruthy()
        done()
      })

    const req = backend.expectOne('/admin/two_level_entity/TestEntity/1');
    expect(req.request.method).toBe("POST");
    req.flush(null, { status: 404, statusText: '404 Not Found' });
  })


  // Sub Item Tests

  it('should create two level sub item', (done) => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
    component.entityName = 'TestEntity'

    component.createTwoLevelEntitySubItem(1, 'NewTestItem')
      .then((data) => {
        expect(data).toBeTruthy()
        done()
      })

    const req = backend.expectOne('/admin/two_level_entity/TestEntity/1/sub_items');
    expect(req.request.method).toBe("POST");
    req.flush(new TwoLevelEntity(), { status: 200, statusText: 'OK' });
  })

  it('should fail to create two level sub item', (done) => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
    component.entityName = 'TestEntity'

    component.createTwoLevelEntitySubItem(1, 'NewTestItem')
      .catch((error) => {
        expect(error).toBeTruthy()
        done()
      })

    const req = backend.expectOne('/admin/two_level_entity/TestEntity/1/sub_items');
    expect(req.request.method).toBe("POST");
    req.flush(null, { status: 404, statusText: '404 Not Found' });
  })


  it('should delete two level sub item', (done) => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
    component.entityName = 'TestEntity'

    spyOn(window, 'confirm').and.returnValue(true);
    component.deleteTwoLevelEntitySubItem(1, 2)
      .then(() => {
        done()
      })
      .catch(() => { throw new Error() })

    const req = backend.expectOne('/admin/two_level_entity/TestEntity/1/sub_items/2');
    expect(req.request.method).toBe("DELETE");
    req.flush(null, { status: 200, statusText: 'OK' });
  })

  it('should fail to delete two level sub item', (done) => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
    component.entityName = 'TestEntity'

    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(window, 'alert').and.returnValue(true);
    component.deleteTwoLevelEntitySubItem(null, null)
      .catch((error) => {
        component.deleteTwoLevelEntitySubItem(1, 2)
          .catch((error) => {
            done()
          })
        const req = backend.expectOne('/admin/two_level_entity/TestEntity/1/sub_items/2');
        expect(req.request.method).toBe("DELETE");
        req.flush(null, { status: 404, statusText: '404 Not Found' });
      })
  })

  it('should update two level sub item', (done) => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
    component.entityName = 'TestEntity'

    component.updateTwoLevelEntitySubItem(1, 2, 'NewTestItem-Edited')
      .then((data) => {
        expect(data).toBeTruthy()
        done()
      })

    const req = backend.expectOne('/admin/two_level_entity/TestEntity/1/sub_items/2');
    expect(req.request.method).toBe("POST");
    req.flush(new TwoLevelEntity(), { status: 200, statusText: 'OK' });
  })

  it('should fail to update two level sub item', (done) => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
    component.entityName = 'TestEntity'

    component.updateTwoLevelEntitySubItem(1, 2, 'NewTestItem-Edited')
      .catch((error) => {
        expect(error).toBeTruthy()
        done()
      })

    const req = backend.expectOne('/admin/two_level_entity/TestEntity/1/sub_items/2');
    expect(req.request.method).toBe("POST");
    req.flush(null, { status: 404, statusText: '404 Not Found' });
  })
});
