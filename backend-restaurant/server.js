const express = require("express");
const http = require("http"); // Necesario para socket.io
const socketIo = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);

const PORT = 3000;

// Definir la ruta correcta a la carpeta 'public'
const publicPath = path.join(__dirname, "..", "public");
app.use(express.static(publicPath));

// Ruta principal para servir 'caja.html'
app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "caja.html"));
});

// Manejo de conexiones de clientes con Socket.io
io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");

  // Escuchar cuando un mesero envía un pedido
  socket.on("nuevoPedido", (pedido) => {
    console.log("Pedido recibido:", pedido);
    io.emit("pedidoActualizado", pedido); // Enviar a todos los clientes
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});

// Iniciar servidor
server.listen(PORT, () => {
  console.log(`🔥 Servidor en http://localhost:${PORT}`);
});
