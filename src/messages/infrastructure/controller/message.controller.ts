import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	ValidationPipe,
} from '@nestjs/common';
import { MessageSQLiteRepository } from '../repository/sqlite.repository';
import { MessageUseCase } from './../../application/message.use-case';
import { CreateMessageDto } from '../dto/request';
import { UUIDValid } from './../../../shareKernel/UUID';

@Controller('message')
export class MessageController {
	constructor(private readonly appService: MessageSQLiteRepository) {}
	private messageCaseUse = new MessageUseCase(this.appService);

	@Get(':chatId')
	getAllMessages(@Param() params: any): Promise<any> {
		UUIDValid(params.chatId);
		return this.messageCaseUse.getMessageAllofChat(params.chatId);
	}

	@Post('/create')
	async createMessage(
		@Body(new ValidationPipe()) body: CreateMessageDto,
	): Promise<any> {
		UUIDValid(body.chatId);
		UUIDValid(body.userId);
		await this.messageCaseUse.registerMessage(body);
		return {
			status: 201,
		};
	}
}
