import { Customer, CustomerContact } from "../customer/customer.model";
import { User } from "../user/user.model";

export class Project {
    id: number;
    customer: Customer = null;
    customer_contact: CustomerContact = null;
    created_at: Date = null;
    project_manager: User;
    title: string = null;
    description: string = null;
    number_of_files: number = null;
    source_format: string = null;
    target_format: string = null;
    comment: string = null;
}