const fs = require('fs');
const WebSocket = require('ws');
const https = require('https');
const path = require('path');

// 端口
const PORT = 9888;

const certPath = path.join(__dirname, 'pem/1_ws.yangxc.cn_bundle.crt');
const keyPath = path.join(__dirname, 'pem/2_ws.yangxc.cn.key');

console.log('certPath:::', certPath);
console.log('keyPath:::', keyPath);

const server = https.createServer({
  cert: fs.readFileSync(certPath),
  key: fs.readFileSync(keyPath)
}).listen(PORT)

console.log('server:::', server);

const wss = new WebSocket.Server({ server });

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

// server.listen(PORT);
