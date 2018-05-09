import { SimpleEntity } from "./simple-entity.model";
import { TwoLevelEntity } from "./two-level-entity.model";

// General models

export class Address {
    id: number;
    street: string = null;
    street2: string = null;
    zipcode: string = null;
    city: string = null;
    country: SimpleEntity = null;
}