import { Injectable } from '@angular/core';
import { SimpleEntity, SimpleEntityCollection } from '../shared/model/simple-entity.model'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { TwoLevelEntity, TwoLevelEntityCollection } from '../shared/model/two-level-entity.model';
import { UtilService } from './util.service';
import { User } from '../user/user.model';
import * as _ from "lodash";

@Injectable()
export class CoreDataService {

  protected $data: BehaviorSubject<CoreData>;
  protected $dataLoaded: BehaviorSubject<Boolean>;

  constructor(
    protected util: UtilService,
    protected http: HttpClient
  ) {
    this.$dataLoaded = <BehaviorSubject<Boolean>>new BehaviorSubject(false);
    this.$data = <BehaviorSubject<CoreData>>new BehaviorSubject(new CoreData);

    this.refreshDefaultData(() => { this.$dataLoaded.next(true) }, null);
  }


  getData() {
    return this.$data.asObservable();
  }

  getDataLoaded() {
    return this.$dataLoaded.asObservable();
  }

  coreDataLoaded(): Boolean {
    return this.$dataLoaded.getValue();
  }

  refreshDefaultData(resolve, reject) {
    // Set up post request
    const req = this.http.get<CoreData>(
      '/getDefaults'
    )

    // Execute post request and subscribe to response
    req.subscribe(
      data => {
        data.languages_flat = this.util.getFlattenedTwoLevelEntity(data.languages);
        data.sectors_flat = this.util.getFlattenedTwoLevelEntity(data.sectors);
        this.$data.next(data);

        resolve && resolve(data);
      },
      error => {

        reject && reject(error);
      });

    return
  }

  /**
   * 
   * @param entityName Can be passed in pascal case (php-classname) or snake case (collection name in CoreDataService)
   */
  getSimpleEntityCollection(entityName: string): Promise<SimpleEntityCollection> {

    return new Promise((resolve, reject) => {
      const entityNameConverted = this.util.ucfirst(_.camelCase(entityName));

      // Set up post request
      const req = this.http.get<SimpleEntityCollection>(
        '/admin/simple_entity/' + entityNameConverted
      )

      // Execute post request and subscribe to response
      req.subscribe(
        data => {
          let arrayOfValues = this.$data.getValue();
          arrayOfValues[_.snakeCase(entityName)] = data;
          this.$data.next(arrayOfValues);
          resolve && resolve(data);
        },
        error => {
          reject && reject(error);
        });
    });
  }

  /**
     * Adds item to the database, receives id and adds item
     * to the according array in angular
     */
  createSimpleEntityItem(entityName, newItemName): Promise<SimpleEntity> {

    return new Promise((resolve, reject) => {
      if (entityName == null || entityName == "") {
        alert("Bug: Name der Entity nicht angegeben");
        reject && reject();
      } else if (newItemName == null || newItemName == "") {
        alert("Der neue Name darf nicht leer sein!");
        reject && reject();
      } else {
        const entityNameConverted = this.util.ucfirst(_.camelCase(entityName));

        // Set up post request
        const req = this.http.post<SimpleEntity>(
          '/admin/simple_entity/' + entityNameConverted,
          {
            newItemName
          }
        )

        // Execute post request and subscribe to response
        req.subscribe(
          data => {
            resolve && resolve(data);
          },
          error => {
            reject && reject(error);
          });
      }


    });

  }

  /**
   * Removes item in database and updates angular array
   * on success
   */
  deleteSimpleEntityItem(entityName, item_id): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!confirm("Eintrag wird gelöscht!")) {
        reject && reject();
      } else {
        const entityNameConverted = this.util.ucfirst(_.camelCase(entityName));

        // Set up post request
        const req = this.http.delete<any>(
          '/admin/simple_entity/' + entityNameConverted + '/' + item_id
        )

        // Execute post request and subscribe to response
        req.subscribe(
          (data) => {
            resolve && resolve(data);
          },
          error => {
            reject && reject(error);
          });
      }
    });
  }

  /**
   * Updates item in database and updates angular array
   * on success
   *
   * // Change to input on first click, then update on second click!
   */
  updateSimpleEntityItem(entityName, item_id, itemNewName): Promise<SimpleEntity> {
    return new Promise((resolve, reject) => {
      if (entityName == null || entityName == "") {
        alert("Bug: Name der Entity nicht angegeben")
        reject && reject();
      } else if (itemNewName == null || itemNewName == "") {
        alert("Der neue Name darf nicht leer sein!");
        reject && reject();
      } else {
        {
          const entityNameConverted = this.util.ucfirst(_.camelCase(entityName));

          // Set up post request
          const req = this.http.post<SimpleEntity>(
            '/admin/simple_entity/' + entityNameConverted + '/' + item_id,
            {
              itemNewName: itemNewName
            }
          )

          // Execute post request and subscribe to response
          req.subscribe(
            data => {
              resolve && resolve(data);
            },
            error => {
              reject && reject(error);
            });
        }
      }
    });
  }



  /**
     * 
     * @param entityName Can be passed in pascal case (php-classname) or snake case (collection name in CoreDataService)
     */
  getFlattenedTwoLevelEntityCollection(entityName: string): Promise<TwoLevelEntityCollection> {

    return new Promise((resolve, reject) => {
      const entityNameConverted = this.util.ucfirst(_.camelCase(entityName));

      // Set up post request
      const req = this.http.get<TwoLevelEntityCollection>(
        '/admin/two_level_entity/' + entityNameConverted
      )

      // Execute post request and subscribe to response
      req.subscribe(
        data => {
          let arrayOfValues = this.$data.getValue();
          arrayOfValues[_.snakeCase(entityName)] = data;

          arrayOfValues[_.snakeCase(entityName) + '_flat'] = this.util.getFlattenedTwoLevelEntity(data);;
          this.$data.next(arrayOfValues);

          resolve && resolve(data);
        },
        error => {
          reject && reject(error);
        });
    });
  }

  createTwoLevelEntityItem(entityName, mainItemId, newItemName): Promise<TwoLevelEntity> {

    return new Promise((resolve, reject) => {
      if (entityName == null || entityName == "") {
        alert("Bug: Name der Entity nicht angegeben")
        reject && reject();
      } else if (newItemName == null || newItemName == "") {
        alert("Der neue Name darf nicht leer sein!");
        reject && reject();
      } else {
        const entityNameConverted = this.util.ucfirst(_.camelCase(entityName));


        const url = '/admin/two_level_entity/' + entityNameConverted + (mainItemId ? '/' + mainItemId + '/sub_items' : '');

        // Set up post request
        const req = this.http.post<TwoLevelEntity>(
          url,
          {
            newItemName: newItemName
          }
        )

        // Execute post request and subscribe to response
        req.subscribe(
          data => {
            resolve(data);
          },
          error => {
            reject(error);
          });
      }

    });
  }


  deleteTwoLevelEntityItem(entityName, mainItemId, subItemId): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!confirm("Eintrag wird gelöscht!")) {
        reject && reject()
      } else if (entityName == null || entityName == "") {
        alert("Bug: Name der Entity nicht angegeben")
        reject && reject();
      } else if (!(mainItemId > 0)) {
        alert("Bug: Eine der angegebenen Item IDs ist keine positive Zahl!");
        reject && reject();
      } else {
        const entityNameConverted = this.util.ucfirst(_.camelCase(entityName));

        const url = '/admin/two_level_entity/' + entityNameConverted + '/' + mainItemId + (subItemId ? '/sub_items/' + subItemId : '');

        // Set up post request
        const req = this.http.delete(
          url
        )

        // Execute post request and subscribe to response
        req.subscribe(
          data => {
            resolve(data);
          },
          error => {
            reject(error);
          });
      }

    });
  }

  updateTwoLevelEntityItem(entityName, mainItemId, subItemId, itemNewName): Promise<TwoLevelEntity> {

    return new Promise((resolve, reject) => {
      if (entityName == null || entityName == "") {
        alert("Bug: Name der Entity nicht angegeben")
        reject()
      } else if (itemNewName == null || itemNewName == "") {
        alert("Der neue Name darf nicht leer sein!");
        reject()
      } else {
        const entityNameConverted = this.util.ucfirst(_.camelCase(entityName));

        const url = '/admin/two_level_entity/' + entityNameConverted + '/' + mainItemId + (subItemId ? '/sub_items/' + subItemId : '');

        // Set up post request
        const req = this.http.post<TwoLevelEntity>(
          url,
          {
            itemNewName: itemNewName
          }
        )

        // Execute post request and subscribe to response
        req.subscribe(
          data => {
            resolve && resolve(data);
          },
          error => {
            reject && reject(error);
          });
      }
    });
  }

  makeMainItem() {

  }
  addAsSubItem() {

  }
}

export class CoreData {
  yes_no_in_progress: SimpleEntityCollection;
  anrede: SimpleEntityCollection;
  country: SimpleEntityCollection;
  sectors: TwoLevelEntityCollection;
  sectors_flat: SimpleEntityCollection;
  languages: TwoLevelEntityCollection;
  languages_flat: SimpleEntityCollection;
  services: SimpleEntityCollection;
  price_units: SimpleEntityCollection;
  currency: SimpleEntityCollection;
  cat_tools: SimpleEntityCollection;
  freelancer_payment_types: SimpleEntityCollection;
  freelancer_invoicing_types: SimpleEntityCollection;
  freelancer_rating: SimpleEntityCollection;
  freelancer_status: SimpleEntityCollection;
  customer_origin: SimpleEntityCollection;
  customer_potential: SimpleEntityCollection;
  customer_status: SimpleEntityCollection;
  user_roles: SimpleEntityCollection;
  account_managers: User[];
}