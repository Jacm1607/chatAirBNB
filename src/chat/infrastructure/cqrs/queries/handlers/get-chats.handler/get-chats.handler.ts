import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetChatsQuery } from '../../impl/get-chats.query/get-chats.query';
import { ChatModel } from './../../../../../infrastructure/model/chat.model';

@QueryHandler(GetChatsQuery)
export class GetChatsHandler implements IQueryHandler<GetChatsQuery> {
  constructor(
    @InjectRepository(ChatModel) private chatRepository: Repository<ChatModel>,
  ) {}

  async execute(query: GetChatsQuery): Promise<ChatModel[]> {
    return await this.chatRepository.find();
  }
}
