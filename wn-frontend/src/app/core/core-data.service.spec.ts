import { TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing'

import { CoreDataService, CoreData } from './core-data.service'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { UtilService } from './util.service'
import { RouterTestingModule } from '@angular/router/testing'
import { SimpleEntityCollection } from '../shared/model/simple-entity.model'
import { SimpleSysEntity, SimpleSysEntityCollection } from '../shared/model/simple-sys-entity.model'
import { TwoLevelEntityCollection, TwoLevelEntity } from '../shared/model/two-level-entity.model'
import { OrderStatus } from '../project/order/order.model';
const coreData = require('./core-data.mock.json')

let backend: HttpTestingController
let service: CoreDataService

describe('CoreDataService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        CoreDataService,
        UtilService
      ]
    })

    backend = TestBed.get(HttpTestingController)
    service = TestBed.get(CoreDataService)
    backend.expectOne('/getDefaults').flush(coreData, { status: 200, statusText: 'Ok' })
  }))


  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify()
  }))

  it('should load SimpleSysEntity and SimpleSysEntityCollection classes', () => {
    const simpleSysEntity = new SimpleSysEntity()
    let simpleSysEntityCollection = new SimpleSysEntityCollection()
    simpleSysEntityCollection.values.push(simpleSysEntity)
  })

  it('should be created and default data loaded', fakeAsync(() => {
    expect(service).toBeTruthy()
    expect(service.getDataLoaded()).toBeTruthy()
  }))

  it('should show message box when trying to create simple entity item', (done) => {
    spyOn(window, 'confirm').and.returnValue(true)
    service.createSimpleEntityItem(null, 'TestName')
      .catch(() => {
        service.createSimpleEntityItem('testEntity', null)
          .catch(() => {
            done()
          })
      })
  })

  it('should create simple entity item', () => {
    service.createSimpleEntityItem('testEntity', 'TestName')
    const req = backend.expectOne('/admin/simple_entity/TestEntity')
    expect(req.request.method).toBe("POST")
    expect(req.request.body.newItemName).toEqual('TestName')
    req.flush({}, { status: 200, statusText: 'Ok' })
  })

  it('should delete simple entity item', () => {
    spyOn(window, 'confirm').and.returnValue(true)
    service.deleteSimpleEntityItem('TestEntity', 1)
    const req = backend.expectOne('/admin/simple_entity/TestEntity/1')
    expect(req.request.method).toBe("DELETE")
    req.flush({}, { status: 200, statusText: 'Ok' })
  })

  it('should show message box when trying to update simple entity item', (done) => {
    spyOn(window, 'confirm').and.returnValue(true)
    service.updateSimpleEntityItem(null, 1, 'TestName')
      .catch(() => {
        service.updateSimpleEntityItem('testEntity', 1, null)
          .catch(() => {
            done()
          })
      })
  })

  it('should update simple entity item', () => {
    service.updateSimpleEntityItem('TestEntity', 1, 'TestEditedName')
    const req = backend.expectOne('/admin/simple_entity/TestEntity/1')
    expect(req.request.method).toBe("POST")
    req.flush({}, { status: 200, statusText: 'Ok' })
  })

  it('should get simple entity collection', () => {
    service.getSimpleEntityCollection('testEntity')
    const req = backend.expectOne('/admin/simple_entity/TestEntity')
    expect(req.request.method).toBe("GET")
    req.flush(new SimpleEntityCollection(), { status: 200, statusText: 'Ok' })
  })

  it('should get flattened two level entity collection', () => {
    service.getFlattenedTwoLevelEntityCollection('testEntity')
    const req = backend.expectOne('/admin/two_level_entity/TestEntity')
    expect(req.request.method).toBe("GET")
    req.flush(new TwoLevelEntityCollection(), { status: 200, statusText: 'Ok' })
  })

  it('should show message box when trying to create two level simple entity', (done) => {
    spyOn(window, 'confirm').and.returnValue(true)
    service.createTwoLevelEntityItem(null, 1, 'TestName')
      .catch(() => {
        service.createTwoLevelEntityItem('testEntity', 1, null)
          .catch(() => {
            done()
          })
      })
  })

  it('should create two level entity item', () => {
    service.createTwoLevelEntityItem('testEntity', 1, 'NewEntityName')
    const req = backend.expectOne('/admin/two_level_entity/TestEntity/1/sub_items')
    expect(req.request.method).toBe("POST")
    req.flush(new TwoLevelEntity(), { status: 200, statusText: 'Ok' })
  })

  it('should show message box when trying to delete two level simple entity', (done) => {
    spyOn(window, 'confirm').and.returnValue(true)
    service.deleteTwoLevelEntityItem(null, -1, -1)
      .catch(() => {
        service.deleteTwoLevelEntityItem('testEntity', -1, -1)
          .catch(() => {
            done()
          })
      })
  })

  it('should delete two level entity item', (done) => {
    service.deleteTwoLevelEntityItem('testEntity', 1, 2).then(() => {
      done()
    })
    const req = backend.expectOne('/admin/two_level_entity/TestEntity/1/sub_items/2')
    expect(req.request.method).toBe("DELETE")
    req.flush({}, { status: 200, statusText: 'Ok' })
  })

  it('should show message box when trying to update two level entity item', (done) => {
    spyOn(window, 'confirm').and.returnValue(true)
    service.updateTwoLevelEntityItem(null, 1, 1, 'TestName')
      .catch(() => {
        service.updateTwoLevelEntityItem('entityName', 1, 1, null)
          .catch(() => {
            done()
          })
      })
  })

  it('should update two level entity item', () => {
    service.updateTwoLevelEntityItem('testEntity', 1, 2, 'NewEntityName')
      .then((updatedEntity) => {
        expect(updatedEntity).toBeDefined()
      })
    const req = backend.expectOne('/admin/two_level_entity/TestEntity/1/sub_items/2')
    expect(req.request.method).toBe("POST")
    req.flush(new TwoLevelEntity(), { status: 200, statusText: 'Ok' })
  })

  it('should refresh data loaded', fakeAsync(() => {
    service.refreshDefaultData()
    tick()
    backend.expectOne('/getDefaults').flush(coreData, { status: 404, statusText: 'Not Found' })
  }))

  it('should fail to refresh data loaded', fakeAsync(() => {
    service.refreshDefaultData()
    spyOn(window, 'alert').and.returnValue(true)
    tick()
    backend.expectOne('/getDefaults').flush(null, { status: 404, statusText: 'Not Found' })
  }))


  it('should make main item', (done) => {
    service.makeMainItem(1, 'TestEntity')
      .then((item) => {
        done()
      })

    const req = backend.expectOne('/admin/makeMainItem')
    expect(req.request.method).toBe("POST")
    req.flush(new TwoLevelEntity(), { status: 200, statusText: 'Ok' })
  })

  it('should fail make main item (entity name missing)', (done) => {
    service.makeMainItem(1, null)
      .catch((item) => {
        done()
      })
  })

  it('should fail make main item (id missing)', (done) => {
    service.makeMainItem(null, 'TestEntity')
      .catch((item) => {
        done()
      })
  })

  it('should fail make main item (404)', (done) => {
    service.makeMainItem(1, 'TestEntity')
      .catch((item) => {
        done()
      })

    const req = backend.expectOne('/admin/makeMainItem')
    expect(req.request.method).toBe("POST")
    req.flush(new TwoLevelEntity(), { status: 404, statusText: 'Ok' })
  })

  it('should be added as sub item', (done) => {
    service.addAsSubItem(1, 2, 'TestEntity')
      .then((item) => {
        done()
      })

    const req = backend.expectOne('/admin/addAsSubItem')
    expect(req.request.method).toBe("POST")
    req.flush(new TwoLevelEntity(), { status: 200, statusText: 'Ok' })
  })

  it('should fail to be added as sub item (entity name missing)', (done) => {
    service.addAsSubItem(1, 2, null)
      .catch((item) => {
        done()
      })
  })

  it('should fail to be added as sub item (id missing)', (done) => {
    service.addAsSubItem(null, null, 'TestEntity')
      .catch((item) => {
        done()
      })
  })

  it('should fail to be added as sub item (404)', (done) => {
    service.addAsSubItem(1, 2, 'TestEntity')
      .catch((item) => {
        done()
      })

    const req = backend.expectOne('/admin/addAsSubItem')
    expect(req.request.method).toBe("POST")
    req.flush(new TwoLevelEntity(), { status: 404, statusText: 'Ok' })
  })

})
