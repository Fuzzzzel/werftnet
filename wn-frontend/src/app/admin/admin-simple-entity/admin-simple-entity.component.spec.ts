import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { AdminSimpleEntityComponent } from './admin-simple-entity.component';
import { SharedModule } from '../../shared/shared.module';
import { CoreDataServiceMock } from '../../core/core-data.service-mock';
import { CoreDataService } from '../../core/core-data.service';
import { UtilService } from '../../core/util.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SimpleEntityCollection, SimpleEntity } from '../../shared/model/simple-entity.model';

describe('AdminSimpleEntityComponent', () => {
  let component: AdminSimpleEntityComponent;
  let fixture: ComponentFixture<AdminSimpleEntityComponent>;
  let backend: HttpTestingController

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [AdminSimpleEntityComponent],
      providers: [
        UtilService,
        { provide: CoreDataService, useClass: CoreDataServiceMock }
      ]
    })
      .compileComponents();
    backend = TestBed.get(HttpTestingController)
    fixture = TestBed.createComponent(AdminSimpleEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create and load initial data', (done) => {
    expect(component).toBeTruthy();
    component.entityName = 'TestEntity'

    component.loadSimpleEntityValues()
      .then((data) => {
        expect(component.valuearray).toBeTruthy()
        done()
      })

    const req = backend.expectOne('/admin/simple_entity/TestEntity');
    expect(req.request.method).toBe("GET");
    req.flush(new SimpleEntityCollection(), { status: 200, statusText: 'Ok' });
  })

  it('should create and fail to load initial data', (done) => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
    component.entityName = 'TestEntity'

    component.loadSimpleEntityValues()
      .catch((error) => {
        expect(error).toBeTruthy()
        done()
      })

    const req = backend.expectOne('/admin/simple_entity/TestEntity');
    expect(req.request.method).toBe("GET");
    req.flush(null, { status: 404, statusText: '404 Not Found' });
  })

  it('should create simple entity item', (done) => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
    component.entityName = 'TestEntity'

    component.createSimpleEntityItem('NewTestItem')
      .then((data) => {
        expect(data).toBeTruthy()
        done()
      })

    const req = backend.expectOne('/admin/simple_entity/TestEntity');
    expect(req.request.method).toBe("POST");
    req.flush(new SimpleEntity(), { status: 200, statusText: 'OK' });
  })

  it('should fail to create simple entity item', (done) => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
    component.entityName = 'TestEntity'

    component.createSimpleEntityItem('NewTestItem')
      .catch((error) => {
        expect(error).toBeTruthy()
        done()
      })

    const req = backend.expectOne('/admin/simple_entity/TestEntity');
    expect(req.request.method).toBe("POST");
    req.flush(null, { status: 404, statusText: '404 Not Found' });
  })


  it('should delete simple entity item', (done) => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
    component.entityName = 'TestEntity'

    spyOn(window, 'confirm').and.returnValue(true);
    component.deleteSimpleEntityItem(1)
      .then(() => {
        done()
      })
      .catch(() => { throw new Error() })

    const req = backend.expectOne('/admin/simple_entity/TestEntity/1');
    expect(req.request.method).toBe("DELETE");
    req.flush(null, { status: 200, statusText: 'OK' });
  })

  it('should fail to delete simple entity item', (done) => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
    component.entityName = 'TestEntity'

    spyOn(window, 'confirm').and.returnValues(false, true);
    component.deleteSimpleEntityItem(1)
      .catch((error) => {
        component.deleteSimpleEntityItem(0)
          .catch((error) => {
            done()
          })
        const req = backend.expectOne('/admin/simple_entity/TestEntity/0');
        expect(req.request.method).toBe("DELETE");
        req.flush(null, { status: 404, statusText: '404 Not Found' });
      })
  })

  it('should update simple entity item', (done) => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
    component.entityName = 'TestEntity'

    component.updateSimpleEntityItem(1, 'NewTestItem-Edited')
      .then((data) => {
        expect(data).toBeTruthy()
        done()
      })

    const req = backend.expectOne('/admin/simple_entity/TestEntity/1');
    expect(req.request.method).toBe("POST");
    req.flush(new SimpleEntity(), { status: 200, statusText: 'OK' });
  })

  it('should fail to update simple entity item', (done) => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
    component.entityName = 'TestEntity'

    component.updateSimpleEntityItem(1, 'NewTestItem-Edited')
      .catch((error) => {
        expect(error).toBeTruthy()
        done()
      })

    const req = backend.expectOne('/admin/simple_entity/TestEntity/1');
    expect(req.request.method).toBe("POST");
    req.flush(null, { status: 404, statusText: '404 Not Found' });
  })
});
