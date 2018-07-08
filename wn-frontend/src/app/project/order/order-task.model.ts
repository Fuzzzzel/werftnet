import { Order } from "./order.model";
import { Language, Service } from "../../shared/model/common.model";

export class OrderTask {
    id: number
    order_id: number = null
    position_id: number = null
    task_number: number = null
    task_no_string: string = null
    title: string = null
    task_price: number = null
    created_at: Date = null
}