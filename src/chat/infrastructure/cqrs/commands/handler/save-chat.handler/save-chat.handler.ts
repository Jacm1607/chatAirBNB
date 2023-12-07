import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatValueObject } from './../../../../../domain/chat.value-object';
import { ChatModel } from './../../../../../infrastructure/model/chat.model';

@CommandHandler(ChatValueObject)
export class SaveChatHandler implements ICommandHandler<ChatValueObject> {
	constructor(
		@InjectRepository(ChatModel) private chat: Repository<ChatModel>,
	) {}
	async execute(command: ChatValueObject) {
		const chat = new ChatModel();
		chat.name = command.name;
		chat.guestId = command.guestId;
		chat.hostId = command.hostId;
		chat.timestamp = command.timestamp;
		chat.uuid = command.uuid;
		await this.chat.insert(chat);
	}
}
