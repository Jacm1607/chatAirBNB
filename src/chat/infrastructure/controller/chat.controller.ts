import {
  BadRequestException,
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

@Controller()
export class ChatController {
  constructor(private readonly appService: ChatSQLiteRepository) {}
  private uuidv4Regex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89aAbB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
  private chatCaseUse = new ChatUseCase(this.appService);

  @Get('/chats')
  getAllChat(): Promise<any> {
    return this.chatCaseUse.getChatAll();
  }

  @Get('/chat/guest/:guestId')
  getChatGuest(@Param() guestId: RequestGuest): Promise<any> {
    if (this.uuidv4Regex.test(guestId.guestId)) {
      return this.chatCaseUse.getChatGuest(guestId);
    } else {
      throw new BadRequestException();
    }
  }

  @Get('/chat/host/:hostId')
  getChatHost(@Param() hostId: RequestHost): Promise<any> {
    if (this.uuidv4Regex.test(hostId.hostId)) {
      return this.chatCaseUse.getChatHost(hostId);
    } else {
      throw new BadRequestException();
    }
  }

  @Post('/chat/create')
  async createChat(
    @Body(new ValidationPipe()) body: CreateChatDto,
  ): Promise<any> {
    console.log(body);
    const newChat = await this.chatCaseUse.registerChat(body);
    console.log(newChat);
    return {
      status: 201,
    };
  }
}
