import { Language, YesNoInProgress, Sector, CatTool } from '../shared/model/common.model';
import { Address } from '../shared/model/address.model';
import { Person } from '../shared/model/person.model';
import { SimpleChange } from '@angular/core';
import { PriceLine } from '../shared/model/price-line.model';
import { SimpleEntity } from '../shared/model/simple-entity.model';
import { Contact } from '../shared/model/contact.model';
import { User } from '../user/user.model';

/**
 * Object to hold all information the application can know about a freelancer.
 */
export class Customer extends Contact {
    customer_no: string = null;
    address: Address = new Address();
    origin: CustomerOrigin = null;
    potential: CustomerPotential = null;
    account_manager: User = null;
    status: CustomerStatus = null;
    invoicing_details: string = null;
    contacts: CustomerContact[];
}

export class CustomerOrigin extends SimpleEntity { }

export class CustomerPotential extends SimpleEntity { }

export class CustomerStatus extends SimpleEntity { }

export class CustomerContact extends Person {
    position: string;
}