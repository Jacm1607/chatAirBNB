import { MessageEntity } from './message.enity';

export interface MessageRepository {
	getAllMessageOfChat(chatId: string): Promise<MessageEntity>;
	createMessage(message: MessageEntity): Promise<MessageEntity>;
}
