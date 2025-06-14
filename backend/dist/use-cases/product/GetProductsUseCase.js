"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProductsUseCase = void 0;
class GetProductsUseCase {
    constructor(productRepo) {
        this.productRepo = productRepo;
    }
    async execute() {
        return this.productRepo.getAll();
    }
}
exports.GetProductsUseCase = GetProductsUseCase;
//# sourceMappingURL=GetProductsUseCase.js.map