import { Language, Sector } from "../../shared/model/common.model";
import { CustomerOrigin, CustomerPotential, CustomerStatus } from "../customer.model";
import { User } from "../../user/user.model";

/**
 * Object to hold all information the application can know about a freelancer.
 */
export class CustomerSearchParams {
    name: string;
    asp_name: string;
    akquise: CustomerOrigin;
    account_manager: User;
    potential: CustomerPotential;
    status: CustomerStatus;
    page: number = 1;
}