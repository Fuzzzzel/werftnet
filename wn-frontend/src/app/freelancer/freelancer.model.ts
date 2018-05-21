import { Language, YesNoInProgress, Sector, CatTool } from '../shared/model/common.model';
import { Address } from '../shared/model/address.model';
import { Person } from '../shared/model/person.model';
import { SimpleChange } from '@angular/core';
import { PriceLine } from '../shared/model/price-line.model';
import { SimpleEntity } from '../shared/model/simple-entity.model';

/**
 * Object to hold all information the application can know about a freelancer.
 */
export class Freelancer extends Person {
    supplier_no: string = null;
    company_name: string = null;
    address: Address = new Address();
    fl_status: FreelancerStatus = null;
    fl_rating: FreelancerRating = null;
    mothertounge: Language = null;
    mothertounge2: Language = null;
    dsgvo: YesNoInProgress = null;
    nda: YesNoInProgress = null;
    sworn: boolean = null;
    vat_no: string = null;
    vat_payer: boolean = null;
    tax_id: string = null;
    fl_payment_type: FreelancerPaymentType = null;
    fl_invoicing_type: FreelancerInvoicingType = null;
    bankdetails: string = null
    prices: PriceLine[] = [];
    cat_prices: boolean = null;
    sectors: Sector[] = [];
    cat_tools: CatTool[] = [];
}

export class FreelancerInvoicingType extends SimpleEntity { }

export class FreelancerPaymentType extends SimpleEntity { }

export class FreelancerRating extends SimpleEntity { }

export class FreelancerStatus extends SimpleEntity { }