import { Component, OnInit, Input } from '@angular/core'
import { TwoLevelEntityCollection, TwoLevelEntity } from '../../shared/model/two-level-entity.model'
import { CoreDataService } from '../../core/core-data.service'
import { ActivatedRoute } from '@angular/router'
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { UtilService } from '../../core/util.service';

@Component({
  selector: 'app-admin-two-level-entity',
  templateUrl: './admin-two-level-entity.component.html',
  styleUrls: ['./admin-two-level-entity.component.scss']
})
export class AdminTwoLevelEntityComponent implements OnInit {

  entityName: string = ''
  valuearray: TwoLevelEntityCollection = new TwoLevelEntityCollection()
  main_item_new: string = ''
  subItemNew: string[] = []

  constructor(
    private util: UtilService,
    private coreDataService: CoreDataService,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.entityName = this.route.snapshot.data.entity
    this.loadTwoLevelEntityValues()
  }

  loadTwoLevelEntityValues() {
    this.coreDataService.getFlattenedTwoLevelEntityCollection(this.entityName)
      .then((data) => {
        this.valuearray = data

      })
      .catch((error) => {
        alert(error.message)
      })
  }

  /**
     * Adds item to the database, receives id and adds item
     * to the according array in angular
     */
  createTwoLevelEntityMainItem(newItemName) {
    this.coreDataService.createTwoLevelEntityItem(this.entityName, null, newItemName)
      .then((data) => {
        this.main_item_new = ''
        this.loadTwoLevelEntityValues()
      })
      .catch((error) => {
        alert(error.message)
      })
  }

  /**
   * Removes item in database and updates angular array
   * on success
   */
  deleteTwoLevelEntityMainItem(item_id) {
    if (confirm("Eintrag wird gelöscht!")) {
      this.coreDataService.deleteTwoLevelEntityItem(this.entityName, item_id, null)
        .then(() => {
          this.loadTwoLevelEntityValues()
        })
        .catch((error) => {
          alert(error.message)
        })
    }
  }

  /**
   * Updates item in database and updates angular array
   * on success
   *
   * // Change to input on first click, then update on second click!
   */
  updateTwoLevelEntityMainItem(item_id, item_edited_name) {
    this.coreDataService.updateTwoLevelEntityItem(this.entityName, item_id, null, item_edited_name)
      .then((data) => {
        this.loadTwoLevelEntityValues()
      })
      .catch((error) => {
        alert(error.message)
      })
  }


  /**
     * Adds item to the database, receives id and adds item
     * to the according array in angular
     */
  createTwoLevelEntitySubItem(mainItemId, newItemName) {
    this.coreDataService.createTwoLevelEntityItem(this.entityName, mainItemId, newItemName)
      .then((data) => {
        this.subItemNew[mainItemId] = ''
        this.loadTwoLevelEntityValues()
      })
      .catch((error) => {
        alert(error.message)
      })
  }

  /**
   * Removes item in database and updates angular array
   * on success
   */
  deleteTwoLevelEntitySubItem(mainItemId, subItemId) {
    if (confirm('Eintrag wird gelöscht!')) {
      this.coreDataService.deleteTwoLevelEntityItem(this.entityName, mainItemId, subItemId)
        .then(() => {
          this.loadTwoLevelEntityValues()
        })
        .catch((error) => {
          alert(error.message)
        })
    }
  }

  /**
   * Updates item in database and updates angular array
   * on success
   *
   * // Change to input on first click, then update on second click!
   */
  updateTwoLevelEntitySubItem(mainItemId, subItemId, newItemName) {
    this.coreDataService.updateTwoLevelEntityItem(this.entityName, mainItemId, subItemId, newItemName)
      .then((data) => {
        this.loadTwoLevelEntityValues()
      })
      .catch(error => {
        alert(error.message)
      })
  }

  makeMainItem(subItemId) {
    this.coreDataService.makeMainItem(subItemId, this.entityName)
      .then((item) => {
        this.util.removeFromArray(this.valuearray.values, item)
        this.loadTwoLevelEntityValues()
      })
      .catch((error) => {
        alert(error.message)
      })
  }

  makeSubItem(item) {
    if (item && item.id) {
      // Open Modal to select new main item
      this.openAddAsSubItemModal(item)
        .then((mainItem) => {
          // Send request
          this.addAsSubItemRequest(item.id, mainItem.id, this.entityName)
            .then((data) => {
              this.util.removeFromArray(this.valuearray.values, item)
              this.loadTwoLevelEntityValues()
            })
            .catch((error) => {
              alert(error.message)
            })
        })
        .catch((error) => {
          // Do nothing, window is only dismissed
        })
    } else {
      alert('Es wurde kein Item mit Id übergeben!')
    }
  }

  openAddAsSubItemModal(item) {
    return new Promise<TwoLevelEntity>((resolve, reject) => {
      let modalRef = this.modalService.open(MakeSubItemModalContent)
      modalRef.componentInstance.valuearray = this.valuearray
      modalRef.componentInstance.item = item

      modalRef.result.then(
        (result) => {
          resolve(result)
        },
        (reason) => {
          reject(reason)
        });
    })
  }

  addAsSubItemRequest(itemId, mainItemId, entityName) {
    return new Promise<TwoLevelEntity>((resolve, reject) => {
      this.coreDataService.addAsSubItem(itemId, mainItemId, entityName)
        .then((item) => {
          resolve(item)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}

@Component({
  selector: 'make-sub-item-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Neues Hauptitem für {{ item.name }} wählen</h4>
    </div>
    <div class="modal-body">
      <select class="form-control form-control-sm" name="select-new-main-item" [(ngModel)]="newMainItem" [compareWith]='util.compareById'>
        <option [value]='undefined' selected>-- Bitte wählen --</option>
        <option *ngFor="let option of valuearray.values" [ngValue]="option">{{ option.name }}</option>
      </select>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-sm btn-default" (click)="activeModal.dismiss()">Abbrechen</button>
      <button type="button" class="btn btn-sm btn-primary" (click)="activeModal.close(newMainItem)">Speichern</button>
    </div>
  `
})
export class MakeSubItemModalContent {
  @Input() item
  @Input() valuearray

  public newMainItem: TwoLevelEntity

  constructor(
    public util: UtilService,
    public activeModal: NgbActiveModal
  ) { }
}
