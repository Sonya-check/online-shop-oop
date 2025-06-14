"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
class Order {
    constructor(id, userId, total, createdAt, updatedAt, orderItems) {
        this.id = id;
        this.userId = userId;
        this.total = total;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.orderItems = orderItems;
    }
}
exports.Order = Order;
//# sourceMappingURL=Order.js.map