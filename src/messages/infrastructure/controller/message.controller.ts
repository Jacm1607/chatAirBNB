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
import { MessageEntity } from './../../domain/message.enity';
import { CreateMessageDto } from '../dto/request';

@Controller('message')
export class MessageController {
  constructor(private readonly appService: MessageSQLiteRepository) {}
  private messageCaseUse = new MessageUseCase(this.appService);
  private uuidv4Regex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89aAbB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
  @Get(':chatId')
  getAllMessages(@Param() params: any): Promise<any> {
    return this.messageCaseUse.getMessageAllofChat(params.chatId);
  }

  @Post('/create')
  async createMessage(
    @Body(new ValidationPipe()) body: CreateMessageDto,
  ): Promise<any> {
    await this.messageCaseUse.registerMessage(body);
    return {
      status: 201,
    };
  }
}
