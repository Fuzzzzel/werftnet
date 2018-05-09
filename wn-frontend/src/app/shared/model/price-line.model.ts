import { Language, Service, PriceUnit, Currency } from "./common.model";

// General models

export class PriceLine {
    id: number;
    lng_source: Language = null;
    lng_target: Language = null;
    service: Service = null;
    price_unit: PriceUnit = null;
    price_per_unit: number = null;
    currency: Currency = null;
    minimum_price: number = null;
}