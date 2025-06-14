"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
const PrismaCartRepository_1 = require("../../infrastructure/db/repositories/PrismaCartRepository");
const GetCartUseCase_1 = require("../../use-cases/cart/GetCartUseCase");
const AddToCartUseCase_1 = require("../../use-cases/cart/AddToCartUseCase");
const RemoveFromCartUseCase_1 = require("../../use-cases/cart/RemoveFromCartUseCase");
const realtime_1 = require("../../realtime");
const cartRepo = new PrismaCartRepository_1.PrismaCartRepository();
const getCartUC = new GetCartUseCase_1.GetCartUseCase(cartRepo);
const addToCartUC = new AddToCartUseCase_1.AddToCartUseCase(cartRepo);
const removeFromCartUC = new RemoveFromCartUseCase_1.RemoveFromCartUseCase(cartRepo);
class CartController {
    // GET /api/cart  (нужна авторизация)
    async getCart(req, res, next) {
        try {
            // @ts-ignore: поле user добавляется в authMiddleware
            const userId = req.user.id;
            const items = await getCartUC.execute(userId);
            res.json(items);
        }
        catch (err) {
            next(err);
        }
    }
    // POST /api/cart  (нужна авторизация)
    async addToCart(req, res, next) {
        try {
            // @ts-ignore
            const userId = req.user.id;
            const { productId, quantity } = req.body;
            const item = await addToCartUC.execute(userId, productId, quantity);
            // Уведомляем клиента через WebSocket
            (0, realtime_1.notifyUserCartUpdate)(userId, { action: 'add', item });
            res.status(201).json(item);
        }
        catch (err) {
            next(err);
        }
    }
    // DELETE /api/cart/:productId  (нужна авторизация)
    async removeFromCart(req, res, next) {
        try {
            // @ts-ignore
            const userId = req.user.id;
            const productId = parseInt(req.params.productId, 10);
            await removeFromCartUC.execute(userId, productId);
            (0, realtime_1.notifyUserCartUpdate)(userId, { action: 'remove', productId });
            res.sendStatus(204);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.CartController = CartController;
//# sourceMappingURL=CartController.js.map