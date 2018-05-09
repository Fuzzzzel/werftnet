import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { UtilService } from './util.service';
import { PriceLine } from '../shared/model/price-line.model';

describe('UtilService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [UtilService]
    });
  });

  it('should be created', inject([UtilService], (service: UtilService) => {
    expect(service).toBeTruthy();
  }));

  it('should get combined display name', inject([UtilService], (service: UtilService) => {
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
  }));


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

  it('should find obj in array', inject([UtilService], (service: UtilService) => {
    const objInArray = service.isObjectIdInArray(arr, { id: 2, name: 'does not matter' })
    expect(objInArray).toEqual(true);
  }));

  it('should remove obj from array', inject([UtilService], (service: UtilService) => {
    service.removeFromArray(arr, { id: 2, name: 'does not matter' });

    const objInArray = service.isObjectIdInArray(arr, { id: 2, name: 'does not matter' })
    expect(objInArray).toEqual(false);
  }));

  it('should add copy to array', inject([UtilService], (service: UtilService) => {
    const testObj = {}
    let testArr = []
    service.addCopyToArray(testArr, testObj)
    expect(testArr[0]).not.toBe(testObj)
  }));

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


  it('should order prices by source_language, target_language and service', inject([UtilService], (service: UtilService) => {
    let priceArr = [priceLine1, priceLine2, priceLine3, priceLine4]
    const orderedPriceArr = service.orderPrices(priceArr)
    expect(orderedPriceArr).toEqual([priceLine4, priceLine2, priceLine3, priceLine1])
  }));
});
