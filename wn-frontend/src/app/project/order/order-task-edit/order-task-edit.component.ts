import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CoreData, CoreDataService } from '../../../core/core-data.service';
import { UtilService } from '../../../core/util.service';
import { OrderTaskService } from '../order-task.service';
import { OrderTask } from '../order-task.model';

@Component({
  selector: 'app-order-task-edit',
  templateUrl: './order-task-edit.component.html',
  styleUrls: ['./order-task-edit.component.scss']
})
export class OrderTaskEditComponent implements OnInit {

  @Input('task')
  task: OrderTask = new OrderTask()
  coreData: CoreData = new CoreData()
  taskToEdit: OrderTask;

  @Output()
  save: EventEmitter<OrderTask> = new EventEmitter<OrderTask>()

  @Output()
  delete: EventEmitter<OrderTask> = new EventEmitter<OrderTask>()

  @Output()
  cancel: EventEmitter<void> = new EventEmitter<void>()

  constructor(
    public util: UtilService,
    private coreDataService: CoreDataService,
    private taskService: OrderTaskService
  ) { }

  ngOnInit() {
    this.taskToEdit = this.util.cloneDeep(this.task)

    this.coreDataService.getData().subscribe((data) => {
      this.coreData = data
    })
  }

  cancelEdit() {
    this.cancel.emit()
  }

  saveOrderTask() {
    this.save.emit(this.taskToEdit)
  }

  deleteOrderTask() {
    if (confirm('Soll die Aufgabe wirklich gelöscht werden?')) {
      this.delete.emit(this.task)
    }
  }

}