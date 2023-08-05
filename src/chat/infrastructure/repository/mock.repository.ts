import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { ChatRepository } from 'src/chat/domain/chat.repository';
import { ChatEntity } from 'src/chat/domain/chat.entity';

@Injectable()
export class MockRepository implements ChatRepository {
  private listChat = [
    {
      id: 1,
      uuid: uuid(),
      guestId: 1,
      hostId: 1,
      name: 'Departamento 1',
      timestamp: new Date(),
    },
    {
      id: 2,
      uuid: uuid(),
      guestId: 1,
      hostId: 2,
      name: 'Departamento 2',
      timestamp: new Date(),
    },
  ];
  async getAllChatHost(hostId: number): Promise<any> {
    const chats = await this.listChat.filter((chat) => chat.hostId === hostId);
    return chats;
  }
  async getAllChatGuest(guestId: number): Promise<any> {
    const chats = await this.listChat.filter(
      (chat) => chat.guestId === guestId,
    );
    return chats;
  }
  async createChat(newChat: ChatEntity): Promise<any> {
    return this.listChat.push({
      ...newChat,
      id: this.listChat.length,
      uuid: uuid(),
      timestamp: new Date(),
    });
  }

  async getAllChat(): Promise<any> {
    return this.listChat;
  }
}
