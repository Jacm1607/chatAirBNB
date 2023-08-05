import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatModel } from '../model/chat.model';
import { Repository } from 'typeorm';
import { ChatRepository } from 'src/chat/domain/chat.repository';
import { ChatEntity } from 'src/chat/domain/chat.entity';

@Injectable()
export class ChatSQLiteRepository implements ChatRepository {
  constructor(
    @InjectRepository(ChatModel)
    private chatRepository: Repository<ChatModel>,
  ) {}

  async getAllChatHost(hostId: number): Promise<any> {
    const chats = await this.chatRepository.findBy({ hostId });
    return chats;
  }
  async getAllChatGuest(guestId: number): Promise<any> {
    const chats = await this.chatRepository.findBy({ guestId });
    return chats;
  }
  async createChat(chat: ChatEntity): Promise<any> {
    const newChat = await this.chatRepository.save(chat);
    return newChat;
  }

  async getAllChat(): Promise<any> {
    const chats = await this.chatRepository.find();
    return chats;
  }
}
