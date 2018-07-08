import { Order } from "./order.model";
import { Language } from "../../shared/model/common.model";

export class OrderPosition {
    id: number
    order_id: number = null
    created_at: Date = null
    lng_source: Language = null
    lng_target: Language = null
    title: string = null
    customer_price: number = null
}