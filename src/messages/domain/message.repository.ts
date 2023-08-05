import { MessageEntity } from './message.enity';

export interface MessageRepository {
  getAllMessageOfChat(chatId: string): Promise<MessageEntity | any>;
  createMessage(message: MessageEntity): Promise<MessageEntity | any>;
}
