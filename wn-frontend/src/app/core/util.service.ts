import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { TwoLevelEntity, TwoLevelEntityCollection } from '../shared/model/two-level-entity.model';
import { PriceLine } from '../shared/model/price-line.model';
import { SimpleEntityCollection, SimpleEntity } from '../shared/model/simple-entity.model';
import * as _ from "lodash";

/**
 * Service class with small helper methods used in multiple places of the app.
 */
@Injectable()
export class UtilService {


  constructor(
    private router: Router,
    private location: Location) {
  }

  goTo(route) {
    this.router.navigate([route]);
  }

  historyBack() {
    this.location.back();
  }

  ucfirst(str) {
    str += ''
    var f = str.charAt(0)
      .toUpperCase()
    return f + str.substr(1)
  }

  // Create display name for entities with potential subentities
  getCombinedDisplayName(obj: TwoLevelEntity) {
    if (!obj) return null;

    if (typeof obj.main_item === 'undefined')
      return obj.name;

    return obj.main_item.name + ' (' + obj.name + ')';
  }

  getFlattenedTwoLevelEntity(twoLevelEntity: TwoLevelEntityCollection): SimpleEntityCollection {
    let arrTemp = this.cloneDeep(twoLevelEntity);
    let result = new SimpleEntityCollection();
    let flatArr: SimpleEntity[] = [];

    if (Array.isArray(arrTemp.values)) {
      for (var idxMain = 0; idxMain < arrTemp.values.length; idxMain++) {

        flatArr.push(arrTemp.values[idxMain]);
        if (typeof arrTemp.values[idxMain].sub_items !== 'undefined') {
          for (var idxSub = 0; idxSub < arrTemp.values[idxMain].sub_items.length; idxSub++) {
            arrTemp.values[idxMain].sub_items[idxSub].name = arrTemp.values[idxMain].name + ' (' + arrTemp.values[idxMain].sub_items[idxSub].name + ')';
            flatArr.push(arrTemp.values[idxMain].sub_items[idxSub]);
          }
        }
      }
    }

    result.display_name = arrTemp.display_name;
    flatArr.sort((a, b) => { return a.name.localeCompare(b.name) });
    result.values = flatArr;

    return result;
  }

  compareById(obj1, obj2) {
    return obj1 && obj2 && (obj1.id === obj2.id)
  }

  cloneDeep(obj) {
    return _.cloneDeep(obj);
  }

  isObjectIdInArray(targetArray, obj) {
    for (let i = 0; i < targetArray.length; i++) {
      if (targetArray[i].id === obj.id) {
        return true;
      }
    }
    return false;
  }

  addCopyToArray(targetArray, obj) {
    if (targetArray && obj) {
      const copyObj = this.cloneDeep(obj);
      targetArray.push(copyObj);
    }
  }

  removeFromArray(targetArray, obj) {
    if (targetArray && obj) {
      for (var i = 0; i < targetArray.length; i++) {
        if (targetArray[i].id == obj.id) {
          const test = targetArray.splice(i, 1);
          break;
        }
      }
    }
  }

  orderArrayByName(simpleEntityArray: SimpleEntity[]) {
    if (Array.isArray(simpleEntityArray)) {
      return simpleEntityArray.sort((a, b) => { return a.name.localeCompare(b.name) });
    } else {
      throw new Error('Parameter is not an array')
    }
  }

  orderPrices(prices: PriceLine[]): PriceLine[] {
    if (Array.isArray(prices) === false) {
      throw new Error('Parameter is not an array')
    }

    return prices.sort((a, b) => {
      let result = 0;

      let valA = this.getCombinedDisplayName(a.lng_source);
      let valB = this.getCombinedDisplayName(b.lng_source);
      if (valA && valB)
        result = valA.localeCompare(valB);

      if (result === 0) {
        valA = this.getCombinedDisplayName(a.lng_target);
        valB = this.getCombinedDisplayName(b.lng_target);
        if (valA && valB)
          result = valA.localeCompare(valB);
      }

      if (result === 0) {
        if (a.service && b.service)
          result = a.service.name.localeCompare(b.service.name);
      }

      return result;
    });
  }

}
