import { Component, OnInit, Input } from '@angular/core';
import { SimpleEntityCollection, SimpleEntity } from '../../shared/model/simple-entity.model';
import { CoreDataService } from '../../core/core-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-simple-entity',
  templateUrl: './admin-simple-entity.component.html',
  styleUrls: ['./admin-simple-entity.component.scss']
})
export class AdminSimpleEntityComponent implements OnInit {

  entityName: string = "";
  valuearray: SimpleEntityCollection = new SimpleEntityCollection();
  item_new: string = "";

  constructor(
    private coreDataService: CoreDataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.entityName = this.route.snapshot.data.entity;
    this.loadSimpleEntityValues();
  }

  loadSimpleEntityValues() {
    return new Promise<SimpleEntityCollection>((resolve, reject) => {
      this.coreDataService.getSimpleEntityCollection(this.entityName)
        .then((data) => {
          this.valuearray = data;
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
     * Adds item to the database, receives id and adds item
     * to the according array in angular
     */
  createSimpleEntityItem(newItemName) {
    return new Promise<SimpleEntity>((resolve, reject) => {
      this.coreDataService.createSimpleEntityItem(this.entityName, newItemName)
        .then((data) => {
          this.loadSimpleEntityValues();
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
      this.item_new = '';
    })
  }

  /**
   * Removes item in database and updates angular array
   * on success
   */
  deleteSimpleEntityItem(item_id) {
    return new Promise<any>((resolve, reject) => {
      this.coreDataService.deleteSimpleEntityItem(this.entityName, item_id)
        .then(() => {
          this.loadSimpleEntityValues();
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
   * Updates item in database and updates angular array
   * on success
   *
   * // Change to input on first click, then update on second click!
   */
  updateSimpleEntityItem(item_id, item_edited_name) {
    return new Promise<SimpleEntity>((resolve, reject) => {
      this.coreDataService.updateSimpleEntityItem(this.entityName, item_id, item_edited_name)
        .then((data) => {
          this.loadSimpleEntityValues();
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

}
