import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { UtilService } from './util.service';
import { PriceLine } from '../shared/model/price-line.model';

describe('UtilService', () => {
  let service: UtilService
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [UtilService]
    });
    service = TestBed.get(UtilService)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get combined display name', () => {
    const twoLevelEntityMockSubItem = {
      id: 1,
      name: 'Item Name',
      sub_items: [],
      main_item: {
        id: 2,
        name: 'Main Item'
      }
    }
    const twoLevelEntityMockMainItem = {
      id: 1,
      name: 'Item Name',
      sub_items: []
    }
    const combinedNameSubItem = service.getCombinedDisplayName(twoLevelEntityMockSubItem);
    expect(combinedNameSubItem).toEqual('Main Item (Item Name)');
    const combinedNameMainItem = service.getCombinedDisplayName(twoLevelEntityMockMainItem);
    expect(combinedNameMainItem).toEqual('Item Name');
    const combinedNameNull = service.getCombinedDisplayName(null);
    expect(combinedNameNull).toBeNull();
  });

  it('should compare by id', () => {
    const obj1 = { id: 1, name: 'Object 1' }
    const obj2 = { id: 1, name: 'Object 2' }
    const sameId = service.compareById(obj1, obj2)
    expect(sameId).toBeTruthy()
  })

  let arr = [
    {
      id: 1,
      name: 'Item1'
    },
    {
      id: 2,
      name: 'Item2'
    },
    {
      id: 3,
      name: 'Item3'
    }
  ]

  it('should find obj in array', () => {
    const objInArray = service.isObjectIdInArray(arr, { id: 2, name: 'does not matter' })
    expect(objInArray).toEqual(true);
  });

  it('should remove obj from array', () => {
    service.removeFromArray(null, null)
    service.removeFromArray(arr, { id: 2, name: 'does not matter' });

    const objInArray = service.isObjectIdInArray(arr, { id: 2, name: 'does not matter' })
    expect(objInArray).toEqual(false);
  });

  it('should add copy to array', () => {
    service.addCopyToArray(null, null)
    const testObj = {}
    let testArr = []
    service.addCopyToArray(testArr, testObj)
    expect(testArr[0]).not.toBe(testObj)
  });

  const priceLine1 = new PriceLine()
  priceLine1.lng_source = { id: 11, name: 'X-Language', sub_items: [] }
  priceLine1.lng_target = { id: 11, name: 'B-Language', sub_items: [] }
  priceLine1.service = { id: 1, name: 'A-Service' }
  const priceLine2 = new PriceLine()
  priceLine2.lng_source = { id: 12, name: 'X-Language', sub_items: [] }
  priceLine2.lng_target = { id: 12, name: 'A-Language', sub_items: [] }
  priceLine2.service = { id: 1, name: 'A-Service' }
  const priceLine3 = new PriceLine()
  priceLine3.lng_source = { id: 12, name: 'X-Language', sub_items: [] }
  priceLine3.lng_target = { id: 12, name: 'A-Language', sub_items: [] }
  priceLine3.service = { id: 1, name: 'B-Service' }
  const priceLine4 = new PriceLine()
  priceLine4.lng_source = { id: 2, name: 'A-Language', sub_items: [] }
  priceLine4.lng_target = { id: 2, name: 'A-Language', sub_items: [] }
  priceLine4.service = { id: 1, name: 'C-Service' }


  it('should order prices by source_language, target_language and service', () => {
    let priceArr = [priceLine1, priceLine2, priceLine3, priceLine4]
    const orderedPriceArr = service.orderPrices(priceArr)
    expect(orderedPriceArr).toEqual([priceLine4, priceLine2, priceLine3, priceLine1])

    expect(() => { service.orderPrices(null) }).toThrow(new Error('Parameter is not an array'))
  });

  it('should order array by name', () => {
    const item1 = { id: 1, name: 'Beta' }
    const item2 = { id: 2, name: 'alpha' }
    let arr = [item1, item2]
    service.orderArrayByName(arr)
    expect(arr).toEqual([item2, item1])

    expect(() => { service.orderArrayByName(null) }).toThrow(new Error('Parameter is not an array'))
  })

  it('should not update or add anything if parameters incomplete', () => {
    service.updateOrAddObjectInArrayById([], null)
  })

  it('should add object if no other object with same id is contained', () => {
    let obj = { id: 1 }
    service.updateOrAddObjectInArrayById([], obj)
  })

  it('should update object if another object with same id is contained', () => {
    let obj1 = { id: 1 }
    let obj2 = { id: 2 }
    service.updateOrAddObjectInArrayById([obj1, obj2], obj2)
  })

  it('should recognize object as function', () => {
    const test = function () { }
    const isFunction = service.isFunction(test)
    expect(isFunction).toBeTruthy()
  })

  it('should not recognize null as function', () => {
    const isFunction = service.isFunction(null)
    expect(isFunction).toBeFalsy()
  })
});
