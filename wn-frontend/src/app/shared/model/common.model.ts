import { SimpleEntity } from "./simple-entity.model";
import { TwoLevelEntity } from "./two-level-entity.model";

// General models

export class Anrede extends SimpleEntity { }

export class CatTool extends SimpleEntity { }

export class Country extends SimpleEntity { }

export class Currency extends SimpleEntity { }

export class Language extends TwoLevelEntity { }

export class PriceUnit extends SimpleEntity { }

export class Sector extends TwoLevelEntity { }

export class Service extends SimpleEntity { }

export class YesNoInProgress extends SimpleEntity { }
