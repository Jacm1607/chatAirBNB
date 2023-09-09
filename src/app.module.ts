import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChatController } from './chat/infrastructure/controller/chat.controller';
import { ChatModel } from './chat/infrastructure/model/chat.model';
import { ChatSQLiteRepository } from './chat/infrastructure/repository/sqlite.repository';
import { MessageModel } from './messages/infrastructure/model/message.model';
import { MessageSQLiteRepository } from './messages/infrastructure/repository/sqlite.repository';
import { SQLITE } from './db/sqlite.config';
import { MessageController } from './messages/infrastructure/controller/message.controller';
import { GetChatsHostHandler } from './chat/infrastructure/cqrs/queries/handlers/get-chats-host.handler/get-chats-host.handler';
import { GetAllMessagesOfChatHandler } from './messages/infrastructure/cqrs/queries/handlers/get-all-messages-of-chat.handler/get-all-messages-of-chat.handler';
import { GetChatsHandler } from './chat/infrastructure/cqrs/queries/handlers/get-chats.handler/get-chats.handler';
import { GetChatsGuestHandler } from './chat/infrastructure/cqrs/queries/handlers/get-chats-guest.handler/get-chats-guest.handler';
import { SaveChatHandler } from './chat/infrastructure/cqrs/commands/handler/save-chat.handler/save-chat.handler';
import { SaveMessageHandler } from './messages/infrastructure/cqrs/commands/handler/save-message.handler/save-message.handler';

@Module({
  imports: [
    TypeOrmModule.forRoot(SQLITE),
    TypeOrmModule.forFeature([ChatModel, MessageModel]),
    CqrsModule,
  ],
  controllers: [ChatController, MessageController],
  providers: [
    ChatSQLiteRepository,
    MessageSQLiteRepository,
    GetAllMessagesOfChatHandler,
    GetChatsHandler,
    GetChatsHostHandler,
    GetChatsGuestHandler,
    SaveChatHandler,
    SaveMessageHandler,
  ],
})
export class AppModule {}
