import { Customer } from "../customer.model";
import { PaginatedResult } from "../../core/paginated-result.model";

export class CustomersLoaded extends PaginatedResult {
    items: Customer[] = []
}