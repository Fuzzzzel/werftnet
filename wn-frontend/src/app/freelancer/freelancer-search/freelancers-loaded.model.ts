import { Freelancer } from "../freelancer.model";
import { PaginatedResult } from "../../core/paginated-result.model";

/**
 * Object to hold all information the application can know about a freelancer.
 */
export class FreelancersLoaded extends PaginatedResult {
    items: Freelancer[] = [];
}