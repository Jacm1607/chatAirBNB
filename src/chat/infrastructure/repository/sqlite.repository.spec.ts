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

  it('debe estar definido', () => {
    expect(chatRepository).toBeDefined();
  });

  it('debe llamar a GetChatsHostQuery con el hostId correcto para getAllChatHost', async () => {
    const hostId = '130e2492-a21c-4211-b68c-91cb3a39f294';

    await chatRepository.getAllChatHost(hostId);

    expect(mockQueryBus.execute).toHaveBeenCalledWith(
      new GetChatsHostQuery(hostId),
    );
  });

  it('debe llamar a GetChatsGuestQuery con el guestId correcto para getAllChatGuest', async () => {
    const guestId = 'f21f4103-38e1-42f6-b053-c35680c4e7c4';

    await chatRepository.getAllChatGuest(guestId);

    expect(mockQueryBus.execute).toHaveBeenCalledWith(
      new GetChatsGuestQuery(guestId),
    );
  });

  it('debe llamar a CommandBus.execute con la entidad de chat para createChat', async () => {
    const chatEntity: ChatEntity = {
      uuid: '',
      guestId: '',
      hostId: '',
      name: '',
      timestamp: undefined,
    };

    await chatRepository.createChat(chatEntity);

    expect(mockCommandBus.execute).toHaveBeenCalledWith(chatEntity);
  });

  it('debe llamar a GetChatsQuery para getAllChat', async () => {
    await chatRepository.getAllChat();

    expect(mockQueryBus.execute).toHaveBeenCalledWith(new GetChatsQuery());
  });
});
