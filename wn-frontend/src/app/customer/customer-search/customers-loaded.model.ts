import { Customer } from "../customer.model";

export class CustomersLoaded {
    items: Customer[] = [];
    itemsTotal: Number = 0;
    itemsPerPage: Number = 0;
    page: Number = 1;
    pageMax: Number = 0;
}