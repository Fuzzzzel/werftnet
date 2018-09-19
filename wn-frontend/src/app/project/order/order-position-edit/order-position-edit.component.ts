import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrderPosition } from '../order-position.model';
import { CoreData, CoreDataService } from '../../../core/core-data.service';
import { UtilService } from '../../../core/util.service';
import { OrderTaskService } from '../order-task.service';
import { OrderTask } from '../order-task.model';

@Component({
  selector: 'app-order-position-edit',
  templateUrl: './order-position-edit.component.html',
  styleUrls: ['./order-position-edit.component.scss']
})
export class OrderPositionEditComponent implements OnInit {

  @Input('position')
  position: OrderPosition = new OrderPosition()
  coreData: CoreData = new CoreData()
  positionToEdit: OrderPosition;

  @Output()
  save: EventEmitter<OrderPosition> = new EventEmitter<OrderPosition>()

  @Output()
  delete: EventEmitter<OrderPosition> = new EventEmitter<OrderPosition>()

  @Output()
  cancel: EventEmitter<void> = new EventEmitter<void>()

  constructor(
    public util: UtilService,
    private coreDataService: CoreDataService,
    private taskService: OrderTaskService
  ) { }

  ngOnInit() {
    this.positionToEdit = this.util.cloneDeep(this.position)

    this.coreDataService.getData().subscribe((data) => {
      this.coreData = data
    })
  }

  savePosition() {
    this.save.emit(this.positionToEdit)
  }

  deletePosition() {
    this.delete.emit(this.position)
  }

  cancelEdit() {
    this.cancel.emit()
  }

  createNewOrderTask() {
    this.taskService.createNewOrderTask(this.position)
      .then((data) => {
        this.position.tasks.push(data)
        this.positionToEdit.tasks.push(data)
      })
      .catch((error) => {
        alert(error.message)
      })
  }

  saveOrderTask(task: OrderTask) {
    this.taskService.saveOrderTask(task)
      .then((data) => {
        this.util.updateOrAddObjectInArrayById(this.position.tasks, data)
        this.util.updateOrAddObjectInArrayById(this.positionToEdit.tasks, data)
      })
      .catch((error) => {
        alert(error.message)
      })
  }

  deleteOrderTask(task: OrderTask) {
    this.taskService.deleteOrderTask(task)
      .then((data) => {
        this.util.removeFromArray(this.position.tasks, task)
        this.util.removeFromArray(this.positionToEdit.tasks, task)
      })
      .catch((error) => {
        alert(error.message)
      })
  }

}
