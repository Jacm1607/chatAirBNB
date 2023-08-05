import { Test, TestingModule } from '@nestjs/testing';
import { ChatController } from './chat/infrastructure/controller/chat.controller';
import { AppService } from './chat/infrastructure/repository/app.service';

describe('AppController', () => {
  let appController: ChatController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ChatController],
      providers: [AppService],
    }).compile();

    appController = app.get<ChatController>(ChatController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
