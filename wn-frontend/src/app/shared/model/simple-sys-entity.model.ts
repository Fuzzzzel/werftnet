import { SimpleEntity } from "./simple-entity.model";

/**
 * Object to hold all information the application can know about a user.
 */
export class SimpleSysEntity extends SimpleEntity {
    value: string = null;
    item_order: number;
}

export class SimpleSysEntityCollection {
    display_name: string = null;
    values: SimpleSysEntity[] = [];
}