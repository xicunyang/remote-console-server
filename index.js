const fs = require('fs');
const WebSocket = require('ws');
const https = require('https');
const path = require('path');

const server = https.createServer({
  cert: fs.readFileSync(path.join(__dirname, 'pem/1_mt-ws.yangxc.cn_bundle.crt')),
  key: fs.readFileSync(path.join(__dirname, 'pem/2_mt-ws.yangxc.cn.key')),
  passphrase:'123456'
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
