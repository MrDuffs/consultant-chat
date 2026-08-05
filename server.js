// server.js — WebSocket echo-сервер для тестового задания
// Запуск: node server.js (порт 8081)

const { WebSocketServer } = require('ws');

const PORT = 8081;
const wss = new WebSocketServer({ port: PORT });

console.log(`[WS Server] Echo-сервер запущен на ws://localhost:${PORT}`);

wss.on('connection', (ws) => {
  console.log('[WS Server] Клиент подключился');

  ws.on('message', (m) => {
    const rawMessage = m.toString();
    console.log(`[WS Server] Сообщение получено: ${rawMessage}`);
    
    // Эхо-ответ с задержкой 300 мс
    setTimeout(() => {
      if (ws.readyState === 1) { // OPEN
        console.log(`[WS Server] Отправка эхо-ответа: ${rawMessage}`);
        ws.send(rawMessage);
      }
    }, 300);
  });

  ws.on('close', () => {
    console.log('[WS Server] Клиент отключился');
  });

  // Имитация сбоя сети: раз в 25–35 секунд случайно рвём соединение
  const disconnectTimeout = setTimeout(() => {
    console.log('[WS Server] Имитация обрыва связи (terminate)');
    ws.terminate();
  }, 25000 + Math.random() * 10000);

  ws.on('close', () => {
    clearTimeout(disconnectTimeout);
  });
});
