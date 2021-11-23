const fs = require('fs');
const WebSocket = require('ws');
const https = require('https');
const path = require('path');

const server = https.createServer({
  cert: fs.readFileSync(path.join(__dirname, 'pem/ws.yangxc.cn_chain.crt')),
  key: fs.readFileSync(path.join(__dirname, 'pem/ws.yangxc.cn_key.key')),
  // pfx: fs.readFileSync(path.join(__dirname, 'pem/ws.yangxc.cn.pfx')),
  // passphrase: 'sample'
});

// 端口
const PORT = 9888;

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

server.listen(PORT, () => {
  console.log('done');
});
