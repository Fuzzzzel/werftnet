import { Project } from "../project.model";
import { SimpleEntity } from "../../shared/model/simple-entity.model";
import { OrderPosition } from "./order-position.model";
import { SimpleSysEntity } from "../../shared/model/simple-sys-entity.model";

export class Order extends Project {
    delivery_date_desired: Date = null;
    delivery_date: Date = null;
    status: OrderStatus = null;
    positions: OrderPosition[] = [];
}

export class OrderStatus extends SimpleSysEntity {
}