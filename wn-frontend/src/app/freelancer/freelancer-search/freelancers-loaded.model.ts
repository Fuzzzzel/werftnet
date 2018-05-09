import { Freelancer } from "../freelancer.model";

/**
 * Object to hold all information the application can know about a freelancer.
 */
export class FreelancersLoaded {
    items: Freelancer[] = [];
    itemsTotal: Number = 0;
    itemsPerPage: Number = 0;
    page: Number = 1;
    pageMax: Number = 0;
}