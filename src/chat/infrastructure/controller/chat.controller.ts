import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChatEntity } from 'src/chat/domain/chat.entity';
import { ChatSQLiteRepository } from '../repository/sqlite.repository';
import { ChatUseCase } from 'src/chat/application/chat.use-case';
import { RequestGuest } from './interfaces/request-guest.interface';
import { RequestHost } from './interfaces/request-host.interface';

@Controller()
export class ChatController {
  constructor(private readonly appService: ChatSQLiteRepository) {}

  private chatCaseUse = new ChatUseCase(this.appService);

  @Get('/chats')
  getAllChat(): Promise<any> {
    return this.chatCaseUse.getChatAll();
  }

  @Get('/chat/guest')
  getChatGuest(@Body() body: RequestGuest): Promise<any> {
    return this.chatCaseUse.getChatGuest(body);
  }

  @Get('/chat/host')
  getChatHost(@Body() body: RequestHost): Promise<any> {
    return this.chatCaseUse.getChatHost(body);
  }

  @Post('/chat/create')
  createChat(@Body() body: ChatEntity): Promise<any> {
    const newChat = this.chatCaseUse.registerChat(body);
    return newChat;
  }
}
