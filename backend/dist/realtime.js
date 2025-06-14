"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wss = void 0;
exports.setupWebsocket = setupWebsocket;
exports.notifyUserCartUpdate = notifyUserCartUpdate;
// backend/src/realtime.ts
const ws_1 = require("ws");
// WebSocketServer без собственного порта (будет «привязан» в index.ts)
exports.wss = new ws_1.WebSocketServer({ noServer: true });
// Карта: userId → Set<WebSocket>
const clientsByUser = new Map();
function setupWebsocket(server) {
    server.on('upgrade', (request, socket, head) => {
        exports.wss.handleUpgrade(request, socket, head, (ws) => {
            exports.wss.emit('connection', ws, request);
        });
    });
    exports.wss.on('connection', (ws, req) => {
        // Клиент должен первым сообщением отправить JSON вида { type: 'subscribe', userId }
        ws.on('message', (msg) => {
            try {
                const data = JSON.parse(msg);
                if (data.type === 'subscribe' && typeof data.userId === 'number') {
                    const userId = data.userId;
                    if (!clientsByUser.has(userId)) {
                        clientsByUser.set(userId, new Set());
                    }
                    clientsByUser.get(userId).add(ws);
                    ws.send(JSON.stringify({ type: 'subscribed', userId }));
                }
            }
            catch {
                // Некорректный JSON — пропускаем
            }
        });
        ws.on('close', () => {
            // Удаляем закрытые соединения из clientsByUser
            for (const [uid, setWs] of clientsByUser.entries()) {
                if (setWs.has(ws)) {
                    setWs.delete(ws);
                    if (setWs.size === 0) {
                        clientsByUser.delete(uid);
                    }
                }
            }
        });
    });
}
function notifyUserCartUpdate(userId, payload) {
    const conns = clientsByUser.get(userId);
    if (!conns)
        return;
    const msg = JSON.stringify({ type: 'cartUpdate', data: payload });
    for (const ws of conns) {
        if (ws.readyState === ws.OPEN) {
            ws.send(msg);
        }
    }
}
//# sourceMappingURL=realtime.js.map