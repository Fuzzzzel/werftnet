import { Project } from "../project.model"
import { SimpleEntity } from "../../shared/model/simple-entity.model"
import { OrderPosition } from "./order-position.model"
import { SimpleSysEntity } from "../../shared/model/simple-sys-entity.model"
import { TwoLevelEntity } from "../../shared/model/two-level-entity.model";

export class Order extends Project {
    order_no: number
    delivery_date_desired: Date = null
    delivery_date: Date = null
    sector: TwoLevelEntity = null
    status: OrderStatus = null
    positions: OrderPosition[] = []
}

export class OrderStatus extends SimpleSysEntity {
}