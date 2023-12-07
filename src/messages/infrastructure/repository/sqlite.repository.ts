import { Injectable } from '@nestjs/common';
import { MessageRepository } from 'src/messages/domain/message.repository';
import { MessageEntity } from 'src/messages/domain/message.enity';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllMessagesOfChatQuery } from '../cqrs/queries/impl/get-all-messages-of-chat.query/get-all-messages-of-chat.query';

@Injectable()
export class MessageSQLiteRepository implements MessageRepository {
	constructor(
		private readonly queryBus: QueryBus,
		private readonly commandBus: CommandBus,
	) {}

	async getAllMessageOfChat(chatId: string): Promise<any> {
		return await this.queryBus.execute(new GetAllMessagesOfChatQuery(chatId));
	}
	async createMessage(message: MessageEntity): Promise<any> {
		return await this.commandBus.execute(message);
	}
}
