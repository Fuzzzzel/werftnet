import { Component, OnInit } from '@angular/core';
import { TwoLevelEntityCollection } from '../../shared/model/two-level-entity.model';
import { CoreDataService } from '../../core/core-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-two-level-entity',
  templateUrl: './admin-two-level-entity.component.html',
  styleUrls: ['./admin-two-level-entity.component.scss']
})
export class AdminTwoLevelEntityComponent implements OnInit {

  entityName: string = '';
  valuearray: TwoLevelEntityCollection = new TwoLevelEntityCollection();
  main_item_new: string = '';
  sub_item_new: string = '';

  constructor(
    private coreDataService: CoreDataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.entityName = this.route.snapshot.data.entity;
    this.loadTwoLevelEntityValues();
  }

  loadTwoLevelEntityValues() {
    this.coreDataService.getFlattenedTwoLevelEntityCollection(this.entityName)
      .then((data) => {
        this.valuearray = data;
      })
  }

  /**
     * Adds item to the database, receives id and adds item
     * to the according array in angular
     */
  createTwoLevelEntityMainItem(valueArray, newItemName) {
    this.coreDataService.createTwoLevelEntityItem(this.entityName, null, newItemName)
      .then(() => {
        this.loadTwoLevelEntityValues();
      })
    this.main_item_new = '';
  }

  /**
   * Removes item in database and updates angular array
   * on success
   */
  deleteTwoLevelEntityMainItem(valueArray, item_id) {
    this.coreDataService.deleteTwoLevelEntityItem(this.entityName, item_id, null)
      .then(() => {
        this.loadTwoLevelEntityValues();
      })
  }

  /**
   * Updates item in database and updates angular array
   * on success
   *
   * // Change to input on first click, then update on second click!
   */
  updateTwoLevelEntityMainItem(item_id, item_edited_name) {
    this.coreDataService.updateTwoLevelEntityItem(this.entityName, item_id, null, item_edited_name)
      .then(() => {
        this.loadTwoLevelEntityValues();
      })
  }


  /**
     * Adds item to the database, receives id and adds item
     * to the according array in angular
     */
  createTwoLevelEntitySubItem(mainItemId, newItemName) {
    this.coreDataService.createTwoLevelEntityItem(this.entityName, mainItemId, newItemName)
      .then(() => {
        this.loadTwoLevelEntityValues();
      })
    this.sub_item_new = '';
  }

  /**
   * Removes item in database and updates angular array
   * on success
   */
  deleteTwoLevelEntitySubItem(mainItemId, subItemId) {
    this.coreDataService.deleteTwoLevelEntityItem(this.entityName, mainItemId, subItemId)
      .then(() => {
        this.loadTwoLevelEntityValues();
      })
  }

  /**
   * Updates item in database and updates angular array
   * on success
   *
   * // Change to input on first click, then update on second click!
   */
  updateTwoLevelEntitySubItem(mainItemId, subItemId, newItemName) {
    this.coreDataService.updateTwoLevelEntityItem(this.entityName, mainItemId, subItemId, newItemName)
      .then(() => {
        this.loadTwoLevelEntityValues();
      })
  }

}
