import { SimpleEntity } from "./simple-entity.model";
import { TwoLevelEntity } from "./two-level-entity.model";
import { Contact } from "./contact.model";
import { Anrede, Language } from "./common.model";

// General models

export class Person extends Contact {
    anrede: Anrede = null;
    date_of_birth: Date = null;
    correspond_language: Language = null;
}