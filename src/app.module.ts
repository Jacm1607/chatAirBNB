import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChatController } from './chat/infrastructure/controller/chat.controller';
import { ChatModel } from './chat/infrastructure/model/chat.model';
import { ChatSQLiteRepository } from './chat/infrastructure/repository/sqlite.repository';
import { GetAllMessagesOfChatHandler } from './messages/cqrs/queries/handlers/get-all-messages-of-chat.handler/get-all-messages-of-chat.handler';
import { GetChatsGuestHandler } from './chat/cqrs/queries/handlers/get-chats-guest.handler/get-chats-guest.handler';
import { GetChatsHostHandler } from './chat/cqrs/queries/handlers/get-chats-host.handler/get-chats-host.handler';
import { GetChatsHandler } from './chat/cqrs/queries/handlers/get-chats.handler/get-chats.handler';
import { MockRepository } from './chat/infrastructure/repository/mock.repository';
import { SaveChatHandler } from './chat/cqrs/commands/handler/save-chat.handler/save-chat.handler';
import { SaveMessageHandler } from './messages/cqrs/commands/handler/save-message.handler/save-message.handler';
import { MessageController } from './messages/infrastructure/controller/message.controller';
import { MessageModel } from './messages/infrastructure/model/message.model';
import { MessageSQLiteRepository } from './messages/infrastructure/repository/sqlite.repository';
import { SQLITE } from './db/sqlite.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(SQLITE),
    TypeOrmModule.forFeature([ChatModel, MessageModel]),
    CqrsModule,
  ],
  controllers: [ChatController, MessageController],
  providers: [
    MockRepository,
    ChatSQLiteRepository,
    MessageSQLiteRepository,
    GetAllMessagesOfChatHandler,
    GetChatsHandler,
    GetChatsHostHandler,
    GetChatsGuestHandler,
    SaveChatHandler,
    SaveMessageHandler
  ],
})
export class AppModule {}
