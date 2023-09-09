import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ChatSQLiteRepository } from '../repository/sqlite.repository';
import { ChatUseCase } from './../../application/chat.use-case';
import { RequestGuest } from './interfaces/request-guest.interface';
import { RequestHost } from './interfaces/request-host.interface';
import { CreateChatDto } from './dto/request';
import { UUIDValid } from './../../../shareKernel/UUID';

@Controller()
export class ChatController {
  constructor(private readonly appService: ChatSQLiteRepository) {}
  private chatCaseUse = new ChatUseCase(this.appService);

  @Get('/chats')
  getAllChat(): Promise<any> {
    return this.chatCaseUse.getChatAll();
  }

  @Get('/chat/guest/:guestId')
  getChatGuest(@Param() guestId: RequestGuest): Promise<any> {
    UUIDValid(guestId.guestId)
    return this.chatCaseUse.getChatGuest(guestId);
  }

  @Get('/chat/host/:hostId')
  getChatHost(@Param() hostId: RequestHost): Promise<any> {
    UUIDValid(hostId.hostId)
    return this.chatCaseUse.getChatHost(hostId);
  }

  @Post('/chat/create')
  async createChat(
    @Body(new ValidationPipe()) body: CreateChatDto,
  ): Promise<any> {
    const newChat = await this.chatCaseUse.registerChat(body);
    return {
      status: 201,
    };
  }
}
