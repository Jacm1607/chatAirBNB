import { Module } from '@nestjs/common';
import { ChatController } from './chat/infrastructure/controller/chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatModel } from './chat/infrastructure/model/chat.model';
import { MockRepository } from './chat/infrastructure/repository/mock.repository';
import { ChatSQLiteRepository } from './chat/infrastructure/repository/sqlite.repository';
import { MessageController } from './messages/infrastructure/controller/message.controller';
import { MessageSQLiteRepository } from './messages/infrastructure/repository/sqlite.repository';
import { MessageModel } from './messages/infrastructure/model/message.model';
import { SQLITE } from './db/sqlite.config';
import { CqrsModule } from '@nestjs/cqrs';
import { SaveChatHandler } from './chat/cqrs/commands/handler/save-chat.handler/save-chat.handler';
import { GetChatsHostHandler } from './chat/cqrs/queries/handlers/get-chats-host.handler/get-chats-host.handler';
import { GetChatsGuestHandler } from './chat/cqrs/queries/handlers/get-chats-guest.handler/get-chats-guest.handler';
import { GetChatsHandler } from './chat/cqrs/queries/handlers/get-chats.handler/get-chats.handler';

@Module({
  imports: [
    TypeOrmModule.forRoot(SQLITE),
    TypeOrmModule.forFeature([ChatModel, MessageModel]),
    CqrsModule
  ],
  controllers: [ChatController, MessageController],
  providers: [MockRepository, ChatSQLiteRepository, MessageSQLiteRepository, GetChatsHandler, GetChatsHostHandler, GetChatsGuestHandler, SaveChatHandler],
})
export class AppModule {}
