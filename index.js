const WebSocket = require('ws');

// 端口
const PORT = 9888;

const wss = new WebSocket.Server({port: PORT});

wss.on("connection", (ws, req) => {
  console.log(`ip:${req.socket.remoteAddress} 客户端已连接`);

  ws.on("message", (message) => {
    console.log("接受到消息:", message);

    // 向所有OPEN状态的client发送
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);

        console.log("Send结束");
      }
    });
  });
});
