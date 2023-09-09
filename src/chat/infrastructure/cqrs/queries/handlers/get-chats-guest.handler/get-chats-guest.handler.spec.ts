import { GetChatsGuestHandler } from './get-chats-guest.handler';
import { GetChatsGuestQuery } from '../../impl/get-chats-guest.query/get-chats-guest.query';
import { Repository } from 'typeorm';
import { ChatModel } from './../../../../../infrastructure/model/chat.model';

describe('GetChatsGuestHandler', () => {
  let getChatsGuestHandler: GetChatsGuestHandler;
  let chatRepository: Repository<ChatModel>;

  const mockChatRepository = {
    findBy: jest.fn(),
  };

  beforeEach(() => {
    chatRepository = mockChatRepository as unknown as Repository<ChatModel>;
    getChatsGuestHandler = new GetChatsGuestHandler(chatRepository);
  });

  it('debe definirse', () => {
    expect(getChatsGuestHandler).toBeDefined();
  });

  it('debe llamar a chatRepository.findBy y devolver chats para guestId', async () => {
    const guestId = 'f21f4103-38e1-42f6-b053-c35680c4e7c4';
    const expectedChats = [
      {
        id: 4,
        uuid: '64dffae9-fb30-4139-b1dc-7051d72d37cf',
        hostId: '130e2492-a21c-4211-b68c-91cb3a39f294',
        guestId: 'f21f4103-38e1-42f6-b053-c35680c4e7c4',
        name: 'Chat 1',
        timestamp: '2023-09-08T20:36:12.814Z',
      },
      {
        id: 8,
        uuid: '9b5a4359-c2be-44a6-a11a-b793d8e7299c',
        hostId: '130e2492-a21c-4211-b68c-91cb3a39f294',
        guestId: 'f21f4103-38e1-42f6-b053-c35680c4e7c4',
        name: 'Chat 1',
        timestamp: '2023-09-08T20:36:13.139Z',
      },
    ];

    mockChatRepository.findBy.mockResolvedValue(expectedChats);

    const query = new GetChatsGuestQuery(guestId);
    const result = await getChatsGuestHandler.execute(query);

    expect(mockChatRepository.findBy).toHaveBeenCalledWith({ guestId });
    expect(result).toEqual(expectedChats);
  });
});
