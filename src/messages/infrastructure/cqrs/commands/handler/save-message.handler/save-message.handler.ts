import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageValueObject } from 'src/messages/domain/message.value-object';
import { MessageModel } from 'src/messages/infrastructure/model/message.model';
import { Repository } from 'typeorm';

@CommandHandler(MessageValueObject)
export class SaveMessageHandler implements ICommandHandler<MessageValueObject> {
	constructor(
		@InjectRepository(MessageModel)
		private messageRepository: Repository<MessageModel>,
	) {}

	async execute(command: MessageValueObject): Promise<any> {
		const message = new MessageModel();
		message.uuid = command.uuid;
		message.guestId = command.guestId ?? null;
		message.hostId = command.hostId ?? null;
		message.message = command.message;
		message.chatId = command.chatId;
		message.timestamp = command.timestamp ?? new Date();
		await this.messageRepository.insert(message);
	}
}
