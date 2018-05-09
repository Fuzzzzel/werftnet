import { SimpleEntity } from "./simple-entity.model";
import { TwoLevelEntity } from "./two-level-entity.model";

// General models

export class Contact {
    id: number;
    name1: string = null;
    name2: string = null;
    phone: string = null;
    phone2: string = null;
    email: string = null;
    email2: string = null;
    skype: string = null;
    fax: string = null;
    comment: string = null;
    created_at: Date = null;
}