import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { TwoLevelEntity, TwoLevelEntityCollection } from '../shared/model/two-level-entity.model'
import { UtilService } from './util.service'
import { CoreDataService, CoreData } from './core-data.service'
let coreDataMock = require('./core-data.mock.json')

@Injectable()
export class CoreDataServiceMock extends CoreDataService {

  constructor(
    util: UtilService,
    http: HttpClient
  ) {
    super(util, http)
  }

  fetchDefaultData(): Promise<CoreData> {
    this.$dataLoaded.next(false)

    // Execute post request and subscribe to response
    let coreDataProcessed: CoreData = new CoreData()
    Object.assign(coreDataProcessed, coreDataMock)

    let languages: TwoLevelEntityCollection = new TwoLevelEntityCollection()
    Object.assign(languages, coreDataMock.languages)
    coreDataProcessed.languages_flat = this.util.getFlattenedTwoLevelEntity(languages)

    let sectors: TwoLevelEntityCollection = new TwoLevelEntityCollection()
    Object.assign(sectors, coreDataMock.languages)
    coreDataProcessed.sectors_flat = this.util.getFlattenedTwoLevelEntity(sectors)

    this.$data.next(coreDataProcessed)
    return Promise.resolve(coreDataProcessed)
  }
}