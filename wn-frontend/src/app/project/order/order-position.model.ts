import { Order } from "./order.model";

export class OrderPosition {
    id: number;
    order: Order;
    created_at: Date = null;
}