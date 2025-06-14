// backend/src/realtime.ts
import { WebSocketServer, WebSocket } from 'ws';
import { IncomingMessage } from 'http';

// WebSocketServer без собственного порта (будет «привязан» в index.ts)
export const wss = new WebSocketServer({ noServer: true });

// Карта: userId → Set<WebSocket>
const clientsByUser: Map<number, Set<WebSocket>> = new Map();

export function setupWebsocket(server: any) {
  server.on('upgrade', (request: IncomingMessage, socket: any, head: any) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  });

  wss.on('connection', (ws: WebSocket, req: IncomingMessage) => {
    // Клиент должен первым сообщением отправить JSON вида { type: 'subscribe', userId }
    ws.on('message', (msg: string) => {
      try {
        const data = JSON.parse(msg);
        if (data.type === 'subscribe' && typeof data.userId === 'number') {
          const userId: number = data.userId;
          if (!clientsByUser.has(userId)) {
            clientsByUser.set(userId, new Set());
          }
          clientsByUser.get(userId)!.add(ws);
          ws.send(JSON.stringify({ type: 'subscribed', userId }));
        }
      } catch {
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

export function notifyUserCartUpdate(userId: number, payload: any) {
  const conns = clientsByUser.get(userId);
  if (!conns) return;
  const msg = JSON.stringify({ type: 'cartUpdate', data: payload });
  for (const ws of conns) {
    if (ws.readyState === ws.OPEN) {
      ws.send(msg);
    }
  }
}