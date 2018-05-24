import { TestBed, async, inject } from '@angular/core/testing';

import { CoreDataService, CoreData } from './core-data.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UtilService } from './util.service';
import { RouterTestingModule } from '@angular/router/testing';
import { SimpleEntityCollection } from '../shared/model/simple-entity.model';
import { TwoLevelEntityCollection, TwoLevelEntity } from '../shared/model/two-level-entity.model';
const coreData = require('./core-data.mock.json');

let backend: HttpTestingController
let coreDataService: CoreDataService

describe('CoreDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        CoreDataService,
        UtilService
      ]
    });

    backend = TestBed.get(HttpTestingController)
    coreDataService = TestBed.get(CoreDataService)
  });


  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  it('should be created and default data loaded', () => {
    backend.expectOne('/getDefaults').flush(coreData, { status: 200, statusText: 'Ok' });
    expect(coreDataService).toBeTruthy();
    expect(coreDataService.coreDataLoaded()).toBeTruthy()
    expect(coreDataService.getDataLoaded()).toBeTruthy()
  });

  const simpleEntityMock = {

  }

  it('should show message box when trying to create simple entity item', (done) => {
    backend.expectOne('/getDefaults').flush(coreData, { status: 200, statusText: 'Ok' });

    coreDataService.createSimpleEntityItem(null, 'TestName')
      .catch(() => {
        coreDataService.createSimpleEntityItem('testEntity', null)
          .catch(() => {
            done()
          })
        spyOn(window, 'confirm').and.returnValue(true);
      })
    spyOn(window, 'confirm').and.returnValue(true);
  });

  it('should create simple entity item', () => {
    backend.expectOne('/getDefaults').flush(coreData, { status: 200, statusText: 'Ok' });
    coreDataService.createSimpleEntityItem('testEntity', 'TestName')
    const req = backend.expectOne('/admin/simple_entity/TestEntity');
    expect(req.request.method).toBe("POST");
    expect(req.request.body.newItemName).toEqual('TestName')
    req.flush({}, { status: 200, statusText: 'Ok' });
  });

  it('should delete simple entity item', () => {
    backend.expectOne('/getDefaults').flush(coreData, { status: 200, statusText: 'Ok' });
    spyOn(window, 'confirm').and.returnValue(true);
    coreDataService.deleteSimpleEntityItem('TestEntity', 1);
    const req = backend.expectOne('/admin/simple_entity/TestEntity/1');
    expect(req.request.method).toBe("DELETE");
    req.flush({}, { status: 200, statusText: 'Ok' });
  });

  it('should update simple entity item', () => {
    backend.expectOne('/getDefaults').flush(coreData, { status: 200, statusText: 'Ok' });
    coreDataService.updateSimpleEntityItem('TestEntity', 1, 'TestEditedName');
    const req = backend.expectOne('/admin/simple_entity/TestEntity/1');
    expect(req.request.method).toBe("POST");
    req.flush({}, { status: 200, statusText: 'Ok' });
  });

  it('should get simple entity collection', () => {
    backend.expectOne('/getDefaults').flush(coreData, { status: 200, statusText: 'Ok' });
    coreDataService.getSimpleEntityCollection('testEntity');
    const req = backend.expectOne('/admin/simple_entity/TestEntity');
    expect(req.request.method).toBe("GET");
    req.flush(new SimpleEntityCollection(), { status: 200, statusText: 'Ok' });
  });

  it('should get flattened two level entity collection', () => {
    backend.expectOne('/getDefaults').flush(coreData, { status: 200, statusText: 'Ok' });
    coreDataService.getFlattenedTwoLevelEntityCollection('testEntity');
    const req = backend.expectOne('/admin/two_level_entity/TestEntity');
    expect(req.request.method).toBe("GET");
    req.flush(new TwoLevelEntityCollection(), { status: 200, statusText: 'Ok' });
  });

  it('should create two level entity item', () => {
    backend.expectOne('/getDefaults').flush(coreData, { status: 200, statusText: 'Ok' });
    coreDataService.createTwoLevelEntityItem('testEntity', 1, 'NewEntityName');
    const req = backend.expectOne('/admin/two_level_entity/TestEntity/1/sub_items');
    expect(req.request.method).toBe("POST");
    req.flush(new TwoLevelEntity(), { status: 200, statusText: 'Ok' });
  });

  it('should delete two level entity item', () => {
    backend.expectOne('/getDefaults').flush(coreData, { status: 200, statusText: 'Ok' });
    spyOn(window, 'confirm').and.returnValue(true);
    coreDataService.deleteTwoLevelEntityItem('testEntity', 1, 2);
    const req = backend.expectOne('/admin/two_level_entity/TestEntity/1/sub_items/2');
    expect(req.request.method).toBe("DELETE");
    req.flush({}, { status: 200, statusText: 'Ok' });
  });

  it('should show message box when trying to update simple entity item', (done) => {
    backend.expectOne('/getDefaults').flush(coreData, { status: 200, statusText: 'Ok' });

    coreDataService.updateSimpleEntityItem(null, 1, 'TestName')
      .catch(() => {
        coreDataService.updateSimpleEntityItem('testEntity', 1, null)
          .catch(() => {
            done()
          })
        spyOn(window, 'confirm').and.returnValue(true);
      })
    spyOn(window, 'confirm').and.returnValue(true);
  });

  it('should update two level entity item', () => {
    backend.expectOne('/getDefaults').flush(coreData, { status: 200, statusText: 'Ok' });
    coreDataService.updateTwoLevelEntityItem('testEntity', 1, 2, 'NewEntityName');
    const req = backend.expectOne('/admin/two_level_entity/TestEntity/1/sub_items/2');
    expect(req.request.method).toBe("POST");
    req.flush(new TwoLevelEntity(), { status: 200, statusText: 'Ok' });
  });

});
