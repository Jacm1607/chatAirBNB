import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MessageSQLiteRepository } from '../repository/sqlite.repository';
import { MessageUseCase } from 'src/messages/application/message.use-case';
import { MessageEntity } from 'src/messages/domain/message.enity';

@Controller('message')
export class MessageController {
  constructor(private readonly appService: MessageSQLiteRepository) {}
  private messageCaseUse = new MessageUseCase(this.appService);

  @Get(':chatId')
  getAllMessages(@Param() params: any): Promise<any> {
    return this.messageCaseUse.getMessageAllofChat(params.chatId);
  }

  @Post('/create')
  createMessage(@Body() body: MessageEntity): Promise<any> {
    return this.messageCaseUse.registerMessage(body);
  }
}
