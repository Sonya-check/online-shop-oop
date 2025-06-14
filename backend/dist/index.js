"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/index.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
require("./config/env");
const env_1 = require("./config/env");
const authRoutes_1 = __importDefault(require("./interfaces-adapters/routes/authRoutes"));
const productRoutes_1 = __importDefault(require("./interfaces-adapters/routes/productRoutes"));
const cartRoutes_1 = __importDefault(require("./interfaces-adapters/routes/cartRoutes"));
const orderRoutes_1 = __importDefault(require("./interfaces-adapters/routes/orderRoutes"));
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
const realtime_1 = require("./realtime");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/auth', authRoutes_1.default);
app.use('/api/products', productRoutes_1.default);
app.use('/api/cart', cartRoutes_1.default);
app.use('/api/orders', orderRoutes_1.default);
app.use(errorMiddleware_1.errorMiddleware);
const server = http_1.default.createServer(app);
(0, realtime_1.setupWebsocket)(server);
server.listen(env_1.PORT, () => {
    console.log(`Server (HTTP + WebSocket) is running on port ${env_1.PORT}`);
});
//# sourceMappingURL=index.js.map