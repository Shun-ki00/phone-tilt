const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 3000 });

function broadcast(data) {
  for (const client of wss.clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  }
}

wss.on("connection", (ws, req) => {
  console.log("connected from:", req.socket.remoteAddress);

  ws.on("message", (message) => {
    const now = new Date();
    console.log(now.toLocaleString(), "Received:", message.toString());
    broadcast(message.toString());
  });

  ws.on("close", (code, reason) => {
    console.log("close:", code, reason?.toString?.() ?? "");
  });

  ws.on("error", (err) => {
    console.log("ws error:", err.message);
  });
});

console.log("WebSocket server listening on ws://0.0.0.0:3000");