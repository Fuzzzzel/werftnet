import { SimpleEntity } from "./simple-entity.model";

/**
 * Object to hold all information the application can know about a user.
 */
export class TwoLevelEntity extends SimpleEntity {
    sub_items: SimpleEntity[] = [];
}

export class TwoLevelEntityCollection extends SimpleEntity {
    display_name: string = "";
    values: TwoLevelEntity[] = [];
}