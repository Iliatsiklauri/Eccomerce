import { Server, Socket } from "socket.io";
import { MessageService } from "../services/message.service";

const adminSockets: Set<string> = new Set();
const userToSocketMap: Map<string, string> = new Map();
const MessagesService = new MessageService();

export const webSocketSetup = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    const userId = socket.handshake.query.userId as string;
    const isAdmin = socket.handshake.query.isAdmin === "true";

    if (isAdmin) {
      adminSockets.add(socket.id);
    } else {
      userToSocketMap.delete("undefined");
      userToSocketMap.set(userId, socket.id);
    }

    socket.on("sendMessage", (message) => {
      MessagesService.addMessage(message);
      if (message.recieverId) {
        const receiverSockets = userToSocketMap.get(`${message.recieverId}`);
        if (receiverSockets) {
          io.to(receiverSockets).emit("recieveMessage", message);
        }
      } else {
        adminSockets.forEach((adminSocketId) => {
          io.to(adminSocketId).emit("recieveMessage", message);
        });
      }

      io.to(socket.id).emit("recieveMessage", { ...message, echoed: true });
    });
  });
};
