import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageRepository } from 'src/messages/domain/message.repository';
import { MessageModel } from '../model/message.model';
import { MessageEntity } from 'src/messages/domain/message.enity';

@Injectable()
export class MessageSQLiteRepository implements MessageRepository {
  constructor(
    @InjectRepository(MessageModel)
    private messageRepository: Repository<MessageModel>,
  ) {}

  async getAllMessageOfChat(chatId: string): Promise<any> {
    const messages = await this.messageRepository.findBy({ chatId });
    return messages;
  }
  async createMessage(message: MessageEntity): Promise<any> {
    const newMessage = await this.messageRepository.save(message);
    return newMessage;
  }
}
