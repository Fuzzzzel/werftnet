import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Order } from '../../order.model';

@Component({
  selector: 'app-order-head-view',
  templateUrl: './order-head-view.component.html',
  styleUrls: ['./order-head-view.component.scss']
})
export class OrderHeadViewComponent implements OnInit {

  @Input('order')
  order: Order

  editMode: boolean = false

  @Output()
  save: EventEmitter<Order> = new EventEmitter<Order>()

  constructor() { }

  ngOnInit() {
  }

  toggleEditMode() {
    this.editMode = !this.editMode
  }

  saveOrderHead(orderHead) {
    this.save.emit(orderHead)
  }

}
