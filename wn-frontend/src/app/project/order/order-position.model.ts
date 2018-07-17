import { Order } from "./order.model";
import { Language } from "../../shared/model/common.model";
import { OrderTask } from "./order-task.model";

export class OrderPosition {
    id: number
    order_id: number = null
    pos_no_string: string = null
    created_at: Date = null
    lng_source: Language = null
    lng_target: Language = null
    title: string = null
    customer_price: number = null
    tasks: OrderTask[] = []
}