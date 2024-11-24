import { AppDataSource } from "../db/database-connect";
import { Message } from "../db/entities/Message";
import { User } from "../db/entities/User";

export class MessageService {
  private readonly messageRepository = AppDataSource.getRepository(Message);
  private readonly userRepository = AppDataSource.getRepository(User);

  async addMessage(message: Message) {
    try {
      const newMessage = new Message();

      if (message.recieverId) {
        newMessage.recieverId = message.recieverId;
        newMessage.senderId = null;
      } else if (message.senderId) {
        newMessage.senderId = message.senderId;
        newMessage.recieverId = null;
      }
      newMessage.content = message.content;

      await this.messageRepository.save(newMessage);

      return newMessage;
    } catch (er) {
      console.log(er, "Error while fetching user");
    }
  }

  async getAllMessage(userId: number) {
    try {
      const messages = await this.messageRepository.find({
        where: [{ recieverId: userId }, { senderId: userId }],
        relations: ["sender", "reciever"],
      });

      return messages;
    } catch (er) {
      console.log(er, "Error while fetching all messages");
      return null;
    }
  }

  async getAllUsersFromMessages() {
    try {
      const users = new Map<number, User>();
      const messages = await this.messageRepository.find({
        relations: ["sender", "reciever"],
      });

      messages.forEach((message: Message) => {
        if (message.sender && !users.has(message.sender.id)) {
          users.set(message.sender.id, message.sender);
        }
      });

      return Array.from(users.values());
    } catch (error) {
      console.error(error);
    }
  }
}
