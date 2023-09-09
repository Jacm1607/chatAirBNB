import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { MessageEntity } from 'src/messages/domain/message.enity';
import { GetAllMessagesOfChatQuery } from '../cqrs/queries/impl/get-all-messages-of-chat.query/get-all-messages-of-chat.query';
import { MessageSQLiteRepository } from './sqlite.repository';

describe('MessageSQLiteRepository', () => {
  let messageSQLiteRepository: MessageSQLiteRepository;
  let queryBus: QueryBus;
  let commandBus: CommandBus;

  const mockQueryBus = {
    execute: jest.fn(),
  };

  const mockCommandBus = {
    execute: jest.fn(),
  };

  beforeEach(() => {
    queryBus = mockQueryBus as unknown as QueryBus;
    commandBus = mockCommandBus as unknown as CommandBus;
    messageSQLiteRepository = new MessageSQLiteRepository(queryBus, commandBus);
  });

  it('should be defined', () => {
    expect(messageSQLiteRepository).toBeDefined();
  });

  it('should get all messages of a chat', async () => {
    const chatId = 'test-chat-id';

    const expectedMessages = [
      { id: 1, message: 'Message 1', chatId },
      { id: 2, message: 'Message 2', chatId },
    ];

    mockQueryBus.execute.mockResolvedValue(expectedMessages);

    const result = await messageSQLiteRepository.getAllMessageOfChat(chatId);

    expect(mockQueryBus.execute).toHaveBeenCalledWith(
      expect.any(GetAllMessagesOfChatQuery),
    );
    expect(result).toEqual(expectedMessages);
  });

  it('should create a message', async () => {
    const messageEntity: MessageEntity = {
      message: 'Hello',
      chatId: 'test-chat-id',
      guestId: 'test-chat-id',
      hostId: '789-000',
      timestamp: new Date(),
      uuid: 'chat-id',
    };

    const expectedMessage = { id: 1, message: 'Hello', chatId: 'test-chat-id' };

    mockCommandBus.execute.mockResolvedValue(expectedMessage);

    const result = await messageSQLiteRepository.createMessage(messageEntity);

    expect(mockCommandBus.execute).toHaveBeenCalledWith(messageEntity);
    expect(result).toEqual(expectedMessage);
  });
});
