import { PaginatedResult } from "../../../core/paginated-result.model";
import { Order } from "../order.model";

export class OrdersLoaded extends PaginatedResult {
    items: Order[] = []
}