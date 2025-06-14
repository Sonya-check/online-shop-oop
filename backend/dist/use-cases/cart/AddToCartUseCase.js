"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddToCartUseCase = void 0;
class AddToCartUseCase {
    constructor(cartRepo) {
        this.cartRepo = cartRepo;
    }
    async execute(userId, productId, quantity) {
        return this.cartRepo.addToCart(userId, productId, quantity);
    }
}
exports.AddToCartUseCase = AddToCartUseCase;
//# sourceMappingURL=AddToCartUseCase.js.map