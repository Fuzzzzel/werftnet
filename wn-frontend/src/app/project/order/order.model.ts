import { Project } from "../project.model";
import { SimpleEntity } from "../../shared/model/simple-entity.model";
import { OrderPosition } from "./order-position.model";

export class Order extends Project {
    delivery_date_desired: Date = null;
    delivery_date: Date = null;
    status: OrderStatus = null;
    positions: OrderPosition[] = [];
}

export class OrderStatus extends SimpleEntity {
}