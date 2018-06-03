import { async, ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing'

import { AdminTwoLevelEntityComponent } from './admin-two-level-entity.component'
import { SharedModule } from '../../shared/shared.module'
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { CoreDataService } from '../../core/core-data.service'
import { CoreDataServiceMock } from '../../core/core-data.service-mock'
import { UtilService } from '../../core/util.service'
import { TwoLevelEntityCollection, TwoLevelEntity } from '../../shared/model/two-level-entity.model'
import { NgbModalStack } from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';

describe('AdminTwoLevelEntityComponent', () => {
  let component: AdminTwoLevelEntityComponent
  let fixture: ComponentFixture<AdminTwoLevelEntityComponent>
  let backend: HttpTestingController

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [AdminTwoLevelEntityComponent],
      providers: [
        UtilService,
        NgbModalStack,
        { provide: CoreDataService, useClass: CoreDataServiceMock }
      ]
    })
      .compileComponents()
    backend = TestBed.get(HttpTestingController)
    fixture = TestBed.createComponent(AdminTwoLevelEntityComponent)
    component = fixture.componentInstance
    tick()
  }))

  it('should create and load initial data', fakeAsync(() => {
    expect(component).toBeTruthy()
    fixture.detectChanges()
    component.entityName = 'TestEntity'

    component.loadTwoLevelEntityValues()
    tick()

    const req = backend.expectOne('/admin/two_level_entity/TestEntity')
    expect(req.request.method).toBe("GET")
    req.flush(new TwoLevelEntityCollection(), { status: 200, statusText: 'Ok' })
  }))

  it('should create and fail to load initial data', fakeAsync(() => {
    expect(component).toBeTruthy()
    fixture.detectChanges()
    component.entityName = 'TestEntity'

    component.loadTwoLevelEntityValues()
    tick()

    const req = backend.expectOne('/admin/two_level_entity/TestEntity')
    expect(req.request.method).toBe("GET")
    req.flush(null, { status: 404, statusText: '404 Not Found' })
  }))

  // Main Item Tests

  it('should create two level main item', fakeAsync(() => {
    expect(component).toBeTruthy()
    fixture.detectChanges()
    component.entityName = 'TestEntity'

    component.createTwoLevelEntityMainItem('NewTestItem')
    tick()

    const req = backend.expectOne('/admin/two_level_entity/TestEntity')
    expect(req.request.method).toBe("POST")
    req.flush(new TwoLevelEntity(), { status: 200, statusText: 'OK' })
  }))

  it('should fail to create two level main item', fakeAsync(() => {
    expect(component).toBeTruthy()
    fixture.detectChanges()
    component.entityName = 'TestEntity'

    component.createTwoLevelEntityMainItem('NewTestItem')
    tick()

    const req = backend.expectOne('/admin/two_level_entity/TestEntity')
    expect(req.request.method).toBe("POST")
    req.flush(null, { status: 404, statusText: '404 Not Found' })
  }))


  it('should delete two level main item', fakeAsync(() => {
    expect(component).toBeTruthy()
    fixture.detectChanges()
    component.entityName = 'TestEntity'

    spyOn(window, 'confirm').and.returnValue(true)
    component.deleteTwoLevelEntityMainItem(1)
    tick()

    const req = backend.expectOne('/admin/two_level_entity/TestEntity/1')
    expect(req.request.method).toBe("DELETE")
    req.flush(null, { status: 200, statusText: 'OK' })
  }))

  it('should fail to delete two level main item', fakeAsync(() => {
    expect(component).toBeTruthy()
    fixture.detectChanges()
    component.entityName = 'TestEntity'

    spyOn(window, 'confirm').and.returnValue(true)
    spyOn(window, 'alert').and.returnValue(true)
    component.deleteTwoLevelEntityMainItem(null)
    tick()

    component.deleteTwoLevelEntityMainItem(1)
    const req = backend.expectOne('/admin/two_level_entity/TestEntity/1')
    expect(req.request.method).toBe("DELETE")
    req.flush(null, { status: 404, statusText: '404 Not Found' })
  }))

  it('should update two level main item', fakeAsync(() => {
    expect(component).toBeTruthy()
    fixture.detectChanges()
    component.entityName = 'TestEntity'

    component.updateTwoLevelEntityMainItem(1, 'NewTestItem-Edited')
    tick()

    const req = backend.expectOne('/admin/two_level_entity/TestEntity/1')
    expect(req.request.method).toBe("POST")
    req.flush(new TwoLevelEntity(), { status: 200, statusText: 'OK' })
  }))

  it('should fail to update two level main item', fakeAsync(() => {
    expect(component).toBeTruthy()
    fixture.detectChanges()
    component.entityName = 'TestEntity'

    component.updateTwoLevelEntityMainItem(1, 'NewTestItem-Edited')
    tick()

    const req = backend.expectOne('/admin/two_level_entity/TestEntity/1')
    expect(req.request.method).toBe("POST")
    req.flush(null, { status: 404, statusText: '404 Not Found' })
  }))


  // Sub Item Tests

  it('should create two level sub item', fakeAsync(() => {
    expect(component).toBeTruthy()
    fixture.detectChanges()
    component.entityName = 'TestEntity'

    component.createTwoLevelEntitySubItem(1, 'NewTestItem')
    tick()

    const req = backend.expectOne('/admin/two_level_entity/TestEntity/1/sub_items')
    expect(req.request.method).toBe("POST")
    req.flush(new TwoLevelEntity(), { status: 200, statusText: 'OK' })
  }))

  it('should fail to create two level sub item', fakeAsync(() => {
    expect(component).toBeTruthy()
    fixture.detectChanges()
    component.entityName = 'TestEntity'

    component.createTwoLevelEntitySubItem(1, 'NewTestItem')
    tick()

    const req = backend.expectOne('/admin/two_level_entity/TestEntity/1/sub_items')
    expect(req.request.method).toBe("POST")
    req.flush(null, { status: 404, statusText: '404 Not Found' })
  }))


  it('should delete two level sub item', fakeAsync(() => {
    expect(component).toBeTruthy()
    fixture.detectChanges()
    component.entityName = 'TestEntity'

    spyOn(window, 'confirm').and.returnValue(true)
    component.deleteTwoLevelEntitySubItem(1, 2)
    tick()

    const req = backend.expectOne('/admin/two_level_entity/TestEntity/1/sub_items/2')
    expect(req.request.method).toBe("DELETE")
    req.flush(null, { status: 200, statusText: 'OK' })
  }))

  it('should fail to delete two level sub item', fakeAsync(() => {
    expect(component).toBeTruthy()
    fixture.detectChanges()
    component.entityName = 'TestEntity'

    spyOn(window, 'confirm').and.returnValue(true)
    spyOn(window, 'alert').and.returnValue(true)
    component.deleteTwoLevelEntitySubItem(null, null)

    component.deleteTwoLevelEntitySubItem(1, 2)
    tick()
    const req = backend.expectOne('/admin/two_level_entity/TestEntity/1/sub_items/2')
    expect(req.request.method).toBe("DELETE")
    req.flush(null, { status: 404, statusText: '404 Not Found' })
  }))

  it('should update two level sub item', fakeAsync(() => {
    expect(component).toBeTruthy()
    fixture.detectChanges()
    component.entityName = 'TestEntity'

    component.updateTwoLevelEntitySubItem(1, 2, 'NewTestItem-Edited')
    tick()

    const req = backend.expectOne('/admin/two_level_entity/TestEntity/1/sub_items/2')
    expect(req.request.method).toBe("POST")
    req.flush(new TwoLevelEntity(), { status: 200, statusText: 'OK' })
  }))

  it('should fail to update two level sub item', fakeAsync(() => {
    expect(component).toBeTruthy()
    fixture.detectChanges()
    component.entityName = 'TestEntity'

    component.updateTwoLevelEntitySubItem(1, 2, 'NewTestItem-Edited')

    const req = backend.expectOne('/admin/two_level_entity/TestEntity/1/sub_items/2')
    expect(req.request.method).toBe("POST")
    req.flush(null, { status: 404, statusText: '404 Not Found' })
  }))
})
