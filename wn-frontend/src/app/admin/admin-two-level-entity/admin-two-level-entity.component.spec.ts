import { async, ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing'

import { AdminTwoLevelEntityComponent, MakeSubItemModalContent } from './admin-two-level-entity.component'
import { SharedModule } from '../../shared/shared.module'
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { CoreDataService } from '../../core/core-data.service'
import { CoreDataServiceMock } from '../../core/core-data.service-mock'
import { UtilService } from '../../core/util.service'
import { TwoLevelEntityCollection, TwoLevelEntity } from '../../shared/model/two-level-entity.model'
import { NgbModalStack } from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { AdminModule } from '../admin.module';

describe('AdminTwoLevelEntityComponent', () => {
  let component: AdminTwoLevelEntityComponent
  let fixture: ComponentFixture<AdminTwoLevelEntityComponent>
  let backend: HttpTestingController
  let modalService: NgbModal
  let modalRef: NgbModalRef

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        AdminModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [],
      providers: [
        UtilService,
        NgbModalStack,
        NgbModal,
        { provide: CoreDataService, useClass: CoreDataServiceMock }
      ]
    })
      .compileComponents()

    backend = TestBed.get(HttpTestingController)
    modalService = TestBed.get(NgbModal)

    fixture = TestBed.createComponent(AdminTwoLevelEntityComponent)
    component = fixture.componentInstance
    tick()
    fixture.detectChanges()
    component.entityName = 'TestEntity'
  }))

  it('should create and load initial data', fakeAsync(() => {
    expect(component).toBeTruthy()
    component.loadTwoLevelEntityValues()
    tick()

    const req = backend.expectOne('/admin/two_level_entity/TestEntity')
    expect(req.request.method).toBe("GET")
    req.flush(new TwoLevelEntityCollection(), { status: 200, statusText: 'Ok' })
  }))

  it('should create and fail to load initial data', fakeAsync(() => {
    component.loadTwoLevelEntityValues()
    tick()

    const req = backend.expectOne('/admin/two_level_entity/TestEntity')
    expect(req.request.method).toBe("GET")
    req.flush(null, { status: 404, statusText: '404 Not Found' })
  }))

  // Main Item Tests

  it('should create two level main item', fakeAsync(() => {
    component.createTwoLevelEntityMainItem('NewTestItem')
    tick()

    const req = backend.expectOne('/admin/two_level_entity/TestEntity')
    expect(req.request.method).toBe("POST")
    req.flush(new TwoLevelEntity(), { status: 200, statusText: 'OK' })
  }))

  it('should fail to create two level main item', fakeAsync(() => {
    component.createTwoLevelEntityMainItem('NewTestItem')
    tick()

    const req = backend.expectOne('/admin/two_level_entity/TestEntity')
    expect(req.request.method).toBe("POST")
    req.flush(null, { status: 404, statusText: '404 Not Found' })
  }))


  it('should delete two level main item', fakeAsync(() => {
    spyOn(window, 'confirm').and.returnValues(false, true)
    component.deleteTwoLevelEntityMainItem(1)
    component.deleteTwoLevelEntityMainItem(1)
    tick()

    const req = backend.expectOne('/admin/two_level_entity/TestEntity/1')
    expect(req.request.method).toBe("DELETE")
    req.flush(null, { status: 200, statusText: 'OK' })
  }))

  it('should fail to delete two level main item', fakeAsync(() => {
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
    component.updateTwoLevelEntityMainItem(1, 'NewTestItem-Edited')
    tick()

    const req = backend.expectOne('/admin/two_level_entity/TestEntity/1')
    expect(req.request.method).toBe("POST")
    req.flush(new TwoLevelEntity(), { status: 200, statusText: 'OK' })
  }))

  it('should fail to update two level main item', fakeAsync(() => {
    component.updateTwoLevelEntityMainItem(1, 'NewTestItem-Edited')
    tick()

    const req = backend.expectOne('/admin/two_level_entity/TestEntity/1')
    expect(req.request.method).toBe("POST")
    req.flush(null, { status: 404, statusText: '404 Not Found' })
  }))


  // Sub Item Tests

  it('should create two level sub item', fakeAsync(() => {
    component.createTwoLevelEntitySubItem(1, 'NewTestItem')
    tick()

    const req = backend.expectOne('/admin/two_level_entity/TestEntity/1/sub_items')
    expect(req.request.method).toBe("POST")
    req.flush(new TwoLevelEntity(), { status: 200, statusText: 'OK' })
  }))

  it('should fail to create two level sub item', fakeAsync(() => {
    component.createTwoLevelEntitySubItem(1, 'NewTestItem')
    tick()

    const req = backend.expectOne('/admin/two_level_entity/TestEntity/1/sub_items')
    expect(req.request.method).toBe("POST")
    req.flush(null, { status: 404, statusText: '404 Not Found' })
  }))


  it('should delete two level sub item', fakeAsync(() => {
    spyOn(window, 'confirm').and.returnValues(false, true)
    component.deleteTwoLevelEntitySubItem(1, 2)
    component.deleteTwoLevelEntitySubItem(1, 2)
    tick()

    const req = backend.expectOne('/admin/two_level_entity/TestEntity/1/sub_items/2')
    expect(req.request.method).toBe("DELETE")
    req.flush(null, { status: 200, statusText: 'OK' })
  }))

  it('should fail to delete two level sub item', fakeAsync(() => {
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
    component.updateTwoLevelEntitySubItem(1, 2, 'NewTestItem-Edited')
    tick()

    const req = backend.expectOne('/admin/two_level_entity/TestEntity/1/sub_items/2')
    expect(req.request.method).toBe("POST")
    req.flush(new TwoLevelEntity(), { status: 200, statusText: 'OK' })
  }))

  it('should fail to update two level sub item', fakeAsync(() => {
    component.updateTwoLevelEntitySubItem(1, 2, 'NewTestItem-Edited')

    const req = backend.expectOne('/admin/two_level_entity/TestEntity/1/sub_items/2')
    expect(req.request.method).toBe("POST")
    req.flush(null, { status: 404, statusText: '404 Not Found' })
  }))

  it('should make main item', fakeAsync(() => {
    component.makeMainItem(2)
    tick()

    const req = backend.expectOne('/admin/makeMainItem')
    expect(req.request.method).toBe("POST")
    req.flush(new TwoLevelEntity(), { status: 200, statusText: 'Ok' })
  }))

  it('should fail to make main item', fakeAsync(() => {
    spyOn(window, 'alert').and.returnValues(true)
    component.makeMainItem(null)
    tick()
  }))

  // Tests with modal
  it('should make sub item', fakeAsync(() => {
    let item = new TwoLevelEntity()
    item.id = 1

    spyOn(component, 'openAddAsSubItemModal').and.callFake(function () {
      return new Promise((resolve, reject) => {
        let mainItem = new TwoLevelEntity()
        mainItem.id = 2
        resolve(mainItem)
      })
    });

    component.makeSubItem(item)
    tick()

    const req = backend.expectOne('/admin/addAsSubItem')
    expect(req.request.method).toBe("POST")
    req.flush(new TwoLevelEntity(), { status: 200, statusText: 'Ok' })
  }))

  it('should cancel make sub item', fakeAsync(() => {
    let item = new TwoLevelEntity()
    item.id = null

    spyOn(window, 'alert').and.returnValue(true);
    component.makeSubItem(item)
    tick()
  }))

  it('should fail to make sub item (404)', fakeAsync(() => {
    let item = new TwoLevelEntity()
    item.id = 1

    spyOn(component, 'openAddAsSubItemModal').and.callFake(function () {
      return new Promise((resolve, reject) => {
        let mainItem = new TwoLevelEntity()
        mainItem.id = 2
        resolve(mainItem)
      })
    });

    component.makeSubItem(item)
    tick()

    const req = backend.expectOne('/admin/addAsSubItem')
    expect(req.request.method).toBe("POST")
    req.flush(null, { status: 404, statusText: 'Ok' })
  }))

  it('should fail to make sub item (cancel modal)', fakeAsync(() => {
    let item = new TwoLevelEntity()
    item.id = 1

    spyOn(component, 'openAddAsSubItemModal').and.callFake(function () {
      return new Promise((resolve, reject) => {
        reject()
      })
    });

    component.makeSubItem(item)
    tick()
  }))


  it('should open modal and close', fakeAsync(() => {
    let item = new TwoLevelEntity()
    item.id = 1
    let mainItem = new TwoLevelEntity()
    mainItem.id = 2

    modalRef = modalService.open(MakeSubItemModalContent);
    modalRef.componentInstance.valuearray = this.valuearray
    modalRef.componentInstance.item = item

    spyOn(modalService, "open").and.returnValue(modalRef);
    component.openAddAsSubItemModal(item)
      .then(() => {
        // Nothing
      })
    tick()

    modalRef.close(mainItem)
    tick()
  }))

  it('should open modal and dismiss', fakeAsync(() => {
    let item = new TwoLevelEntity()
    item.id = 1

    modalRef = modalService.open(MakeSubItemModalContent);
    modalRef.componentInstance.valuearray = this.valuearray
    modalRef.componentInstance.item = item

    spyOn(modalService, "open").and.returnValue(modalRef);
    component.openAddAsSubItemModal(item)
      .catch((errror) => {
        // Nothing
      })
    tick()

    modalRef.dismiss()
    tick()
  }))

})
