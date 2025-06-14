"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveFromCartUseCase = void 0;
class RemoveFromCartUseCase {
    constructor(cartRepo) {
        this.cartRepo = cartRepo;
    }
    async execute(userId, productId) {
        return this.cartRepo.removeFromCart(userId, productId);
    }
}
exports.RemoveFromCartUseCase = RemoveFromCartUseCase;
//# sourceMappingURL=RemoveFromCartUseCase.js.map