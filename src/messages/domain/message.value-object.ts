import { v4 as uuid } from 'uuid';
import { MessageEntity } from './message.enity';

export class MessageValueObject implements MessageEntity {
	uuid: string;
	userId: string;
	chatId: string;
	message: string;
	timestamp: Date;

	constructor({
		userId,
		chatId,
		message,
	}: {
		userId: string;
		chatId: string;
		message: string;
	}) {
		this.uuid = uuid();
		this.chatId = chatId;
		this.userId = userId ?? null;
		this.message = message;
		this.timestamp = new Date();
	}
}
