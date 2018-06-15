import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../../core/util.service';
import { Customer } from '../../../customer/customer.model';
import { Order } from '../order.model';
import { CoreData, CoreDataService } from '../../../core/core-data.service';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.scss']
})
export class OrderEditComponent implements OnInit {

  order_edit: Order = new Order()
  customers: Customer[] = []
  coreData: CoreData = new CoreData()

  constructor(
    public util: UtilService,
    private coreDataService: CoreDataService
  ) { }

  ngOnInit() {
    this.coreDataService.getData().subscribe((data) => {
      this.coreData = data
    })
  }

  cancelEdit() {
    this.util.historyBack()
  }

  saveOrder() {
    alert('Noch nicht implementiert!')
  }

  deleteOrder() {
    alert('Noch nicht implementiert!')
  }

}
