import { Customer } from "../../../customer/customer.model";

export class OrderSearchParams {
    search_text: string
    customer: Customer = null
    from_date: Date = null
    until_date: Date = null
    page: number = 1
}