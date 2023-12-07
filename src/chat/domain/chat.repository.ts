import { ChatEntity } from './chat.entity';

export interface ChatRepository {
	getAllChatHost(hostId: number): Promise<ChatEntity | any>;
	getAllChatGuest(guestId: number): Promise<ChatEntity | any>;
	createChat(chat: ChatEntity): Promise<ChatEntity | any>;
	getAllChat(): Promise<ChatEntity | any>;
}
