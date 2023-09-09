import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatModel } from './../../../../../infrastructure/model/chat.model';
import { GetChatsHostQuery } from '../../impl/get-chats-host.query/get-chats-host.query';

@QueryHandler(GetChatsHostQuery)
export class GetChatsHostHandler implements IQueryHandler<GetChatsHostQuery> {
  constructor(
    @InjectRepository(ChatModel) private chatRepository: Repository<ChatModel>,
  ) {}

  async execute(query: GetChatsHostQuery): Promise<ChatModel[]> {
    const { hostId }: any = query;
    const chats = await this.chatRepository.findBy({ hostId });
    return chats;
  }
}
