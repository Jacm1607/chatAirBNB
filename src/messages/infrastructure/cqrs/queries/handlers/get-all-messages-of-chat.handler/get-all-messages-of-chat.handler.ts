import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllMessagesOfChatQuery } from '../../impl/get-all-messages-of-chat.query/get-all-messages-of-chat.query';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageModel } from './../../../../../infrastructure/model/message.model';
import { Repository } from 'typeorm';

@QueryHandler(GetAllMessagesOfChatQuery)
export class GetAllMessagesOfChatHandler
  implements IQueryHandler<GetAllMessagesOfChatQuery>
{
  constructor(
    @InjectRepository(MessageModel)
    private messageRepository: Repository<MessageModel>,
  ) {}

  async execute(query: GetAllMessagesOfChatQuery): Promise<any> {
    const { chatId }: any = query;
    const messages = await this.messageRepository.findBy({ chatId });
    return messages;
  }
}
