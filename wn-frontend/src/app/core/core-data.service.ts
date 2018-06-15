import { Injectable } from '@angular/core'
import { SimpleEntity, SimpleEntityCollection } from '../shared/model/simple-entity.model'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs'
import { TwoLevelEntity, TwoLevelEntityCollection } from '../shared/model/two-level-entity.model'
import { UtilService } from './util.service'
import { User } from '../user/user.model'
import * as _ from "lodash"
import { OrderStatus } from '../project/order/order.model';

@Injectable()
export class CoreDataService {

  protected $data: BehaviorSubject<CoreData>
  protected $dataLoaded: BehaviorSubject<Boolean>

  constructor(
    protected util: UtilService,
    protected http: HttpClient
  ) {
    this.$dataLoaded = <BehaviorSubject<Boolean>>new BehaviorSubject(false)
    this.$data = <BehaviorSubject<CoreData>>new BehaviorSubject(new CoreData)

    this.refreshDefaultData(() => { this.$dataLoaded.next(true) }, null)
  }


  getData() {
    return this.$data.asObservable()
  }

  getDataLoaded() {
    return this.$dataLoaded.asObservable()
  }

  coreDataLoaded(): Boolean {
    return this.$dataLoaded.getValue()
  }

  refreshDefaultData(resolve, reject) {
    // Set up post request
    const req = this.http.get<CoreData>(
      '/getDefaults'
    )

    // Execute post request and subscribe to response
    req.subscribe(
      data => {
        data.languages_flat = this.util.getFlattenedTwoLevelEntity(data.languages)
        data.sectors_flat = this.util.getFlattenedTwoLevelEntity(data.sectors)
        this.$data.next(data)

        resolve(data)
      },
      error => {

        reject(error)
      })

    return
  }

  /**
   * 
   * @param entityName Can be passed in pascal case (php-classname) or snake case (collection name in CoreDataService)
   */
  getSimpleEntityCollection(entityName: string): Promise<SimpleEntityCollection> {

    return new Promise((resolve, reject) => {
      const entityNameConverted = this.util.ucfirst(_.camelCase(entityName))

      // Set up post request
      const req = this.http.get<SimpleEntityCollection>(
        '/admin/simple_entity/' + entityNameConverted
      )

      // Execute post request and subscribe to response
      req.subscribe(
        data => {
          let arrayOfValues = this.$data.getValue()
          arrayOfValues[_.snakeCase(entityName)] = data
          this.$data.next(arrayOfValues)
          resolve(data)
        },
        error => {
          reject(error)
        })
    })
  }

  /**
     * Adds item to the database, receives id and adds item
     * to the according array in angular
     */
  createSimpleEntityItem(entityName, newItemName): Promise<SimpleEntity> {

    return new Promise((resolve, reject) => {
      if (entityName == null || entityName == "") {
        reject(new Error("Bug: Name der Entity nicht angegeben"))
      } else if (newItemName == null || newItemName == "") {
        reject(new Error("Der neue Name darf nicht leer sein!"))
      } else {
        const entityNameConverted = this.util.ucfirst(_.camelCase(entityName))

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
            resolve(data)
          },
          error => {
            reject(new Error('Fehler beim Speichern: ' + error.error))
          })
      }
    })
  }

  /**
   * Removes item in database and updates angular array
   * on success
   */
  deleteSimpleEntityItem(entityName, item_id): Promise<any> {
    return new Promise((resolve, reject) => {
      const entityNameConverted = this.util.ucfirst(_.camelCase(entityName))

      // Set up post request
      const req = this.http.delete<any>(
        '/admin/simple_entity/' + entityNameConverted + '/' + item_id
      )

      // Execute post request and subscribe to response
      req.subscribe(
        (data) => {
          resolve(data)
        },
        error => {
          reject(new Error('Fehler beim Löschen: ' + error.error))
        })
    })
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
        reject(new Error("Bug: Name der Entity nicht angegeben"))
      } else if (itemNewName == null || itemNewName == "") {
        reject(new Error("Der neue Name darf nicht leer sein!"))
      } else {
        {
          const entityNameConverted = this.util.ucfirst(_.camelCase(entityName))

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
              resolve(data)
            },
            error => {
              reject(new Error('Fehler beim Speichern: ' + error.error))
            })
        }
      }
    })
  }



  /**
     * 
     * @param entityName Can be passed in pascal case (php-classname) or snake case (collection name in CoreDataService)
     */
  getFlattenedTwoLevelEntityCollection(entityName: string): Promise<TwoLevelEntityCollection> {

    return new Promise((resolve, reject) => {
      const entityNameConverted = this.util.ucfirst(_.camelCase(entityName))

      // Set up post request
      const req = this.http.get<TwoLevelEntityCollection>(
        '/admin/two_level_entity/' + entityNameConverted
      )

      // Execute post request and subscribe to response
      req.subscribe(
        data => {
          let arrayOfValues = this.$data.getValue()
          arrayOfValues[_.snakeCase(entityName)] = data

          arrayOfValues[_.snakeCase(entityName) + '_flat'] = this.util.getFlattenedTwoLevelEntity(data);
          this.$data.next(arrayOfValues)

          resolve(data)
        },
        error => {
          reject(error)
        })
    })
  }

  createTwoLevelEntityItem(entityName, mainItemId, newItemName): Promise<TwoLevelEntity> {

    return new Promise((resolve, reject) => {
      if (entityName == null || entityName == "") {
        reject(new Error("Bug: Name der Entity nicht angegeben"))
      } else if (newItemName == null || newItemName == "") {
        reject(new Error("Der neue Name darf nicht leer sein!"))
      } else {
        const entityNameConverted = this.util.ucfirst(_.camelCase(entityName))


        const url = '/admin/two_level_entity/' + entityNameConverted + (mainItemId ? '/' + mainItemId + '/sub_items' : '')

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
            resolve(data)
          },
          error => {
            reject(new Error('Fehler beim Speichern: ' + error.error))
          })
      }

    })
  }


  deleteTwoLevelEntityItem(entityName, mainItemId, subItemId): Promise<any> {
    return new Promise((resolve, reject) => {
      if (entityName == null || entityName == "") {
        reject(new Error("Bug: Name der Entity nicht angegeben"))
      } else if (!(mainItemId > 0)) {
        reject(new Error("Bug: Eine der angegebenen Item IDs ist keine positive Zahl!"))
      } else {
        const entityNameConverted = this.util.ucfirst(_.camelCase(entityName))

        const url = '/admin/two_level_entity/' + entityNameConverted + '/' + mainItemId + (subItemId ? '/sub_items/' + subItemId : '')

        // Set up post request
        const req = this.http.delete(
          url
        )

        // Execute post request and subscribe to response
        req.subscribe(
          data => {
            resolve(data)
          },
          error => {
            reject(new Error('Fehler beim Löschen: ' + error.error))
          })
      }

    })
  }

  updateTwoLevelEntityItem(entityName, mainItemId, subItemId, itemNewName): Promise<TwoLevelEntity> {

    return new Promise((resolve, reject) => {
      if (entityName == null || entityName == "") {
        reject(new Error("Bug: Name der Entity nicht angegeben"))
      } else if (itemNewName == null || itemNewName == "") {
        reject(new Error("Der neue Name darf nicht leer sein!"))
      } else {
        const entityNameConverted = this.util.ucfirst(_.camelCase(entityName))

        const url = '/admin/two_level_entity/' + entityNameConverted + '/' + mainItemId + (subItemId ? '/sub_items/' + subItemId : '')

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
            resolve(data)
          },
          error => {
            reject(new Error('Fehler beim Speichern: ' + error.error))
          })
      }
    })
  }

  makeMainItem(subItemId, entityName) {
    return new Promise<TwoLevelEntity>((resolve, reject) => {
      if (!entityName) {
        reject('Es wurde kein Entity Name angegeben')
        return
      }

      if (subItemId) {
        // Set up post request
        const req = this.http.post<TwoLevelEntity>(
          '/admin/makeMainItem',
          {
            entityName: entityName,
            itemId: subItemId
          }
        )

        // Execute post request and subscribe to response
        req.subscribe(
          data => {
            resolve(data)
          },
          error => {
            reject(new Error('Fehler beim Speichern: ' + error.error))
          })
      } else {
        reject(new Error('Es wurde keine SubItem-Id übergeben!'))
      }

    })
  }

  addAsSubItem(itemId, newMainItemId, entityName) {
    return new Promise<TwoLevelEntity>((resolve, reject) => {
      if (!entityName) {
        reject('Es wurde kein Entity Name angegeben')
        return
      }

      if (itemId && newMainItemId) {
        // Set up post request
        const req = this.http.post<TwoLevelEntity>(
          '/admin/addAsSubItem',
          {
            entityName: entityName,
            itemId: itemId,
            mainItemId: newMainItemId
          }
        )

        // Execute post request and subscribe to response
        req.subscribe(
          data => {
            resolve(data)
          },
          error => {
            reject(new Error('Fehler beim Speichern: ' + error.error))
          })
      } else {
        reject(new Error('Es müssen eine ItemId und ein neues MainItem angegeben werden!'))
      }
    })
  }
}

export class CoreData {
  yes_no_in_progress: SimpleEntityCollection
  anrede: SimpleEntityCollection
  country: SimpleEntityCollection
  sectors: TwoLevelEntityCollection
  sectors_flat: SimpleEntityCollection
  languages: TwoLevelEntityCollection
  languages_flat: SimpleEntityCollection
  services: SimpleEntityCollection
  price_units: SimpleEntityCollection
  currency: SimpleEntityCollection
  cat_tools: SimpleEntityCollection
  freelancer_payment_types: SimpleEntityCollection
  freelancer_invoicing_types: SimpleEntityCollection
  freelancer_rating: SimpleEntityCollection
  freelancer_status: SimpleEntityCollection
  customer_origin: SimpleEntityCollection
  customer_potential: SimpleEntityCollection
  customer_status: SimpleEntityCollection
  user_roles: SimpleEntityCollection
  account_managers: User[]
  order_status: SimpleEntityCollection
}