import { MessageRepository } from '../domain/message.repository';
import { MessageValueObject } from '../domain/message.value-object';

export class MessageUseCase {
	constructor(private readonly messageRepository: MessageRepository) {}

	registerMessage = async ({ guestId, hostId, chatId, message }: any) => {
		const messageValue = new MessageValueObject({
			guestId,
			hostId,
			chatId,
			message,
		});
		const messageCreated = this.messageRepository.createMessage(messageValue);
		return messageCreated;
	};

	getMessageAllofChat = async (chatId) => {
		const messagesGet = this.messageRepository.getAllMessageOfChat(chatId);
		return messagesGet;
	};
}
