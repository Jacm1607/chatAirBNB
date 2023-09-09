import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatModel } from './../../../../../infrastructure/model/chat.model';
import { GetChatsGuestQuery } from '../../impl/get-chats-guest.query/get-chats-guest.query';

@QueryHandler(GetChatsGuestQuery)
export class GetChatsGuestHandler implements IQueryHandler<GetChatsGuestQuery> {
  constructor(
    @InjectRepository(ChatModel) private chatRepository: Repository<ChatModel>,
  ) {}

  async execute(query: GetChatsGuestQuery): Promise<ChatModel[]> {
    const { guestId }: any = query;
    const chats = await this.chatRepository.findBy({ guestId });
    return chats;
  }
}
