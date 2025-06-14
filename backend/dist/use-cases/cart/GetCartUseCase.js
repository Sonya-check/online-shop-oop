"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCartUseCase = void 0;
class GetCartUseCase {
    constructor(cartRepo) {
        this.cartRepo = cartRepo;
    }
    async execute(userId) {
        return this.cartRepo.getCartItemsByUser(userId);
    }
}
exports.GetCartUseCase = GetCartUseCase;
//# sourceMappingURL=GetCartUseCase.js.map