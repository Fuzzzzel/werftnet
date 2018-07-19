import { Freelancer, FreelancerStatus } from "../freelancer.model";
import { Language, Sector, Service } from "../../shared/model/common.model";

/**
 * Object to hold all information the application can know about a freelancer.
 */
export class FreelancerSearchParams {
    name: string
    lng_source: Language
    lng_target: Language
    fl_status: FreelancerStatus
    sector: Sector
    service: Service
    page: number = 1
}