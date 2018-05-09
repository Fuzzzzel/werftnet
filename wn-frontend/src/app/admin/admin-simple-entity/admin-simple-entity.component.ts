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
    this.coreDataService.getSimpleEntityCollection(this.entityName)
      .then((data) => {
        this.valuearray = data;
      })
  }

  /**
     * Adds item to the database, receives id and adds item
     * to the according array in angular
     */
  createSimpleEntityItem(newItemName) {
    this.coreDataService.createSimpleEntityItem(this.entityName, newItemName)
      .then(() => {
        this.loadSimpleEntityValues();
      })
    this.item_new = '';
  }

  /**
   * Removes item in database and updates angular array
   * on success
   */
  deleteSimpleEntityItem(item_id) {
    this.coreDataService.deleteSimpleEntityItem(this.entityName, item_id)
      .then(() => {
        this.loadSimpleEntityValues();
      })
  }

  /**
   * Updates item in database and updates angular array
   * on success
   *
   * // Change to input on first click, then update on second click!
   */
  updateSimpleEntityItem(item_id, item_edited_name) {
    this.coreDataService.updateSimpleEntityItem(this.entityName, item_id, item_edited_name)
      .then(() => {
        this.loadSimpleEntityValues();
      })
  }

}
