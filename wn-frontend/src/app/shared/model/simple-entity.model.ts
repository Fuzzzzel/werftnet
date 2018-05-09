/**
 * Object to hold all information the application can know about a user.
 */
export class SimpleEntity {
    id: Number;
    name: string = null;
    main_item?: SimpleEntity;
}

export class SimpleEntityCollection {
    display_name: string = null;
    values: SimpleEntity[] = [];
}