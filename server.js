const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

let pedidos = []; // Guardará los pedidos

io.on("connection", (socket) => {
  console.log("Usuario conectado:", socket.id);

  socket.on("nuevoPedido", (pedido) => {
    pedido.id = pedidos.length + 1;
    pedido.estado = "En preparación";
    pedidos.push(pedido);

    io.emit("pedidoEnviado", pedidos); // Envía los pedidos actualizados
  });

  socket.on("cambiarEstado", ({ id, nuevoEstado }) => {
    pedidos = pedidos.map((p) =>
      p.id === id ? { ...p, estado: nuevoEstado } : p
    );
    io.emit("pedidoActualizado", pedidos);
  });

  socket.on("pedidoPagado", (id) => {
    pedidos = pedidos.filter((p) => p.id !== id); // Elimina pedido pagado
    io.emit("pedidoEliminado", id);
  });
});

server.listen(3000, () =>
  console.log("Servidor corriendo en http://localhost:3000")
);
