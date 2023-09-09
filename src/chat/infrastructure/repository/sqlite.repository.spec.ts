import { Test, TestingModule } from '@nestjs/testing';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { GetChatsGuestQuery } from '../cqrs/queries/impl/get-chats-guest.query/get-chats-guest.query';
import { GetChatsHostQuery } from '../cqrs/queries/impl/get-chats-host.query/get-chats-host.query';
import { GetChatsQuery } from '../cqrs/queries/impl/get-chats.query/get-chats.query';
import { ChatEntity } from 'src/chat/domain/chat.entity';
import { ChatSQLiteRepository } from './sqlite.repository';

describe('ChatSQLiteRepository', () => {
  let chatRepository: ChatSQLiteRepository;
  let queryBus: QueryBus;
  let commandBus: CommandBus;

  const mockQueryBus = {
    execute: jest.fn(),
  };

  const mockCommandBus = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatSQLiteRepository,
        {
          provide: QueryBus,
          useValue: mockQueryBus,
        },
        {
          provide: CommandBus,
          useValue: mockCommandBus,
        },
      ],
    }).compile();

    chatRepository = module.get<ChatSQLiteRepository>(ChatSQLiteRepository);
    queryBus = module.get<QueryBus>(QueryBus);
    commandBus = module.get<CommandBus>(CommandBus);
  });

  it('should be defined', () => {
    expect(chatRepository).toBeDefined();
  });

  it('should call GetChatsHostQuery with correct hostId for getAllChatHost', async () => {
    const hostId = 'test-host-id';

    await chatRepository.getAllChatHost(hostId);

    expect(mockQueryBus.execute).toHaveBeenCalledWith(
      new GetChatsHostQuery(hostId),
    );
  });

  it('should call GetChatsGuestQuery with correct guestId for getAllChatGuest', async () => {
    const guestId = 'test-guest-id';

    await chatRepository.getAllChatGuest(guestId);

    expect(mockQueryBus.execute).toHaveBeenCalledWith(
      new GetChatsGuestQuery(guestId),
    );
  });

  it('should call CommandBus.execute with chat entity for createChat', async () => {
    const chatEntity: ChatEntity = {
      uuid: '',
      guestId: '',
      hostId: '',
      name: '',
      timestamp: undefined,
    }; // Define el chat entity según tus necesidades

    await chatRepository.createChat(chatEntity);

    expect(mockCommandBus.execute).toHaveBeenCalledWith(chatEntity);
  });

  it('should call GetChatsQuery for getAllChat', async () => {
    await chatRepository.getAllChat();

    expect(mockQueryBus.execute).toHaveBeenCalledWith(new GetChatsQuery());
  });
});
