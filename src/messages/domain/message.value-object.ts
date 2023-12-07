import { v4 as uuid } from 'uuid';
import { MessageEntity } from './message.enity';

export class MessageValueObject implements MessageEntity {
	uuid: string;
	guestId: string;
	hostId: string;
	chatId: string;
	message: string;
	timestamp: Date;

	constructor({
		guestId,
		hostId,
		chatId,
		message,
	}: {
		guestId?: string;
		hostId?: string;
		chatId: string;
		message: string;
	}) {
		this.uuid = uuid();
		this.guestId = guestId ?? null;
		this.chatId = chatId;
		this.hostId = hostId ?? null;
		this.message = message;
		this.timestamp = new Date();
	}
}
