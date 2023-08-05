import { Injectable } from '@nestjs/common';
import { ChatRepository } from 'src/chat/domain/chat.repository';
import { ChatEntity } from 'src/chat/domain/chat.entity';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetChatsGuestQuery } from 'src/chat/cqrs/queries/impl/get-chats-guest.query/get-chats-guest.query';
import { GetChatsHostQuery } from 'src/chat/cqrs/queries/impl/get-chats-host.query/get-chats-host.query';
import { GetChatsQuery } from 'src/chat/cqrs/queries/impl/get-chats.query/get-chats.query';

@Injectable()
export class ChatSQLiteRepository implements ChatRepository {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus:CommandBus
  ) {}

  async getAllChatHost(hostId: any): Promise<any> {
    const chats = await this.queryBus.execute(new GetChatsHostQuery(hostId));
    return chats;
  }
  async getAllChatGuest(guestId: any): Promise<any> {
    const chats = await this.queryBus.execute(new GetChatsGuestQuery(guestId));
    return chats;
  }
  async createChat(chat: ChatEntity): Promise<any> {
    return await this.commandBus.execute(chat);
  }

  async getAllChat(): Promise<any> {
    const chats = await this.queryBus.execute(new GetChatsQuery());
    return chats;
  }
}
