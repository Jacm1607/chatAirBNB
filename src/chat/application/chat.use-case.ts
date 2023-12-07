import { ChatRepository } from '../domain/chat.repository';
import { ChatValueObject } from '../domain/chat.value-object';

export class ChatUseCase {
	constructor(private readonly chatRepository: ChatRepository) {}

	registerChat = async ({ guestId, hostId, name }: any) => {
		const chatValue = new ChatValueObject({
			guestId,
			hostId,
			name,
		});
		const chatCreated = this.chatRepository.createChat(chatValue);
		return chatCreated;
	};

	getChatHost = async ({ hostId }) => {
		const chatsHost = this.chatRepository.getAllChatHost(hostId);
		return chatsHost;
	};

	getChatGuest = async ({ guestId }) => {
		const chatsGuest = this.chatRepository.getAllChatGuest(guestId);
		return chatsGuest;
	};

	getChatAll = async () => {
		const chatsGet = this.chatRepository.getAllChat();
		return chatsGet;
	};
}
