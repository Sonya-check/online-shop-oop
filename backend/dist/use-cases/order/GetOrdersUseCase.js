"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOrdersUseCase = void 0;
class GetOrdersUseCase {
    constructor(orderRepo) {
        this.orderRepo = orderRepo;
    }
    async execute(userId) {
        return this.orderRepo.getOrdersByUser(userId);
    }
}
exports.GetOrdersUseCase = GetOrdersUseCase;
//# sourceMappingURL=GetOrdersUseCase.js.map