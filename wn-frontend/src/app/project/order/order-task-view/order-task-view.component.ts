import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrderTask } from '../order-task.model';
import { CoreData, CoreDataService } from '../../../core/core-data.service';
import { UtilService } from '../../../core/util.service';

@Component({
  selector: 'app-order-task-view',
  templateUrl: './order-task-view.component.html',
  styleUrls: ['./order-task-view.component.scss']
})
export class OrderTaskViewComponent implements OnInit {

  @Input('task')
  task: OrderTask = new OrderTask()

  editMode: boolean = false
  coreData: CoreData = new CoreData()

  @Output()
  save: EventEmitter<OrderTask> = new EventEmitter<OrderTask>()

  @Output()
  delete: EventEmitter<OrderTask> = new EventEmitter<OrderTask>()

  constructor(
    public util: UtilService,
  ) { }

  ngOnInit() {
  }

  toggleEditMode() {
    this.editMode = !this.editMode
  }

  saveOrderTask(task) {
    this.save.emit(task)
    this.toggleEditMode()
  }

  deleteOrderTask(task) {
    this.delete.emit(task)
    this.toggleEditMode()
  }
}