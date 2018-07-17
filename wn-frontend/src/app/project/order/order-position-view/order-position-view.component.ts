import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrderPosition } from '../order-position.model';
import { CoreData, CoreDataService } from '../../../core/core-data.service';
import { UtilService } from '../../../core/util.service';

@Component({
  selector: 'app-order-position-view',
  templateUrl: './order-position-view.component.html',
  styleUrls: ['./order-position-view.component.scss']
})
export class OrderPositionViewComponent implements OnInit {

  @Input('position')
  position: OrderPosition = new OrderPosition()

  editMode: boolean = false
  coreData: CoreData = new CoreData()

  @Output()
  save: EventEmitter<OrderPosition> = new EventEmitter<OrderPosition>()

  @Output()
  delete: EventEmitter<OrderPosition> = new EventEmitter<OrderPosition>()

  constructor(
    public util: UtilService,
  ) { }

  ngOnInit() {
  }

  toggleEditMode() {
    this.editMode = !this.editMode
  }

  saveOrderPosition(position) {
    this.save.emit(position)
    this.toggleEditMode()
  }

  deleteOrderPosition(position: OrderPosition, event: Event) {
    if (event && this.util.isFunction(event.stopPropagation)) {
      event.stopPropagation()
    }
    this.delete.emit(position)
  }

}
