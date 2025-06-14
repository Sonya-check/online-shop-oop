// backend/src/index.ts
import express, { Application } from 'express';
import cors from 'cors';
import http from 'http';
import './config/env';
import { PORT } from './config/env';
import authRoutes from './interfaces-adapters/routes/authRoutes';
import productRoutes from './interfaces-adapters/routes/productRoutes';
import cartRoutes from './interfaces-adapters/routes/cartRoutes';
import orderRoutes from './interfaces-adapters/routes/orderRoutes';
import { errorMiddleware } from './middlewares/errorMiddleware';
import { setupWebsocket } from './realtime';

const app: Application = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

app.use(errorMiddleware);

const server = http.createServer(app);
setupWebsocket(server);

server.listen(PORT, () => {
  console.log(`Server (HTTP + WebSocket) is running on port ${PORT}`);
});