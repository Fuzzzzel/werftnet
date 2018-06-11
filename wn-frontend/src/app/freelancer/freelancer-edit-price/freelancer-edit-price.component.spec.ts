import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerEditPriceComponent } from './freelancer-edit-price.component';
import { SharedModule } from '../../shared/shared.module';
import { UtilService } from '../../core/util.service';
import { CoreDataService } from '../../core/core-data.service';
import { CoreDataServiceMock } from '../../core/core-data.service-mock';
import { RouterTestingModule } from '@angular/router/testing';
import { PriceLine } from '../../shared/model/price-line.model';
import { Language, PriceUnit, Service } from '../../shared/model/common.model';

describe('FreelancerEditPriceComponent', () => {
  let component: FreelancerEditPriceComponent;
  let fixture: ComponentFixture<FreelancerEditPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule
      ],
      declarations: [
        FreelancerEditPriceComponent
      ],
      providers: [
        UtilService,
        { provide: CoreDataService, useClass: CoreDataServiceMock }
      ]
    })
      .compileComponents();
  }));

  const priceLine = new PriceLine()
  priceLine.lng_source = new Language()
  priceLine.lng_target = new Language()
  priceLine.service = new Service()
  priceLine.price_unit = new PriceUnit()
  priceLine.price_per_unit = 0.20

  beforeEach(() => {
    fixture = TestBed.createComponent(FreelancerEditPriceComponent);
    component = fixture.componentInstance;
    component.priceLine = priceLine

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save price', (done) => {
    component.save.subscribe((data) => {
      expect(data).toEqual(priceLine)
      done()
    })
    component.savePrice()
  })

  it('should fail to save price', () => {
    component.priceLineToEdit = new PriceLine()

    spyOn(window, 'alert').and.returnValue(true)
    component.savePrice()
  })

  it('should cancel edit', (done) => {
    component.cancel.subscribe(() => {
      done()
    })
    component.cancelEdit()
  })
});
