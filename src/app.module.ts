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

@Module({
  imports: [
    TypeOrmModule.forRoot(SQLITE),
    TypeOrmModule.forFeature([ChatModel, MessageModel]),
  ],
  controllers: [ChatController, MessageController],
  providers: [MockRepository, ChatSQLiteRepository, MessageSQLiteRepository],
})
export class AppModule {}
