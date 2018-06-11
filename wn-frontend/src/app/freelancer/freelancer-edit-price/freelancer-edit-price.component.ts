import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PriceLine } from '../../shared/model/price-line.model';
import { UtilService } from '../../core/util.service';
import { CoreDataService, CoreData } from '../../core/core-data.service';


@Component({
  selector: 'app-freelancer-edit-price',
  templateUrl: './freelancer-edit-price.component.html',
  styleUrls: ['./freelancer-edit-price.component.scss']
})
export class FreelancerEditPriceComponent implements OnInit {
  @Input('priceLine')
  priceLine: PriceLine = new PriceLine()

  @Output()
  save: EventEmitter<PriceLine> = new EventEmitter<PriceLine>()
  @Output()
  cancel: EventEmitter<void> = new EventEmitter<void>()

  priceLineToEdit: PriceLine
  coreData: CoreData

  constructor(
    public util: UtilService,
    public coreDataService: CoreDataService
  ) { }

  ngOnInit() {
    this.priceLineToEdit = this.util.cloneDeep(this.priceLine)
    this.coreDataService.getData().subscribe(
      (data) => {
        this.coreData = data
      }
    )
  }

  savePrice() {
    if (this.isPriceLineComplete(this.priceLineToEdit)) {
      Object.assign(this.priceLine, this.priceLineToEdit)
      this.save.emit(this.priceLine)
      this.priceLineToEdit = new PriceLine()
    } else {
      alert('Angaben sind nicht vollständig!')
    }
  }

  cancelEdit() {
    this.cancel.emit()
  }

  isPriceLineComplete(priceLine) {
    return priceLine.lng_source && priceLine.lng_target && priceLine.service && priceLine.price_unit && priceLine.price_per_unit
  }


}
