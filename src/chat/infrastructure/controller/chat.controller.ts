import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { ChatEntity } from 'src/chat/domain/chat.entity';
import { ChatSQLiteRepository } from '../repository/sqlite.repository';
import { ChatUseCase } from 'src/chat/application/chat.use-case';
import { RequestGuest } from './interfaces/request-guest.interface';
import { RequestHost } from './interfaces/request-host.interface';
import { CreateChatDto } from './dto/request';

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
  async createChat(@Body(new ValidationPipe()) body: CreateChatDto): Promise<any> {
    console.log(body)
    const newChat = await this.chatCaseUse.registerChat(body);
    console.log(newChat)
    return newChat;
  }
}
