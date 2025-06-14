"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductUseCase = void 0;
class CreateProductUseCase {
    constructor(productRepo) {
        this.productRepo = productRepo;
    }
    async execute(data) {
        return this.productRepo.create(data);
    }
}
exports.CreateProductUseCase = CreateProductUseCase;
//# sourceMappingURL=CreateProductUseCase.js.map