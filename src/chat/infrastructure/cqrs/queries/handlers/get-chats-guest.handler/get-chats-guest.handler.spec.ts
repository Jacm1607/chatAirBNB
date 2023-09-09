import { GetChatsGuestHandler } from './get-chats-guest.handler'; // Asegúrate de que la ruta sea correcta
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

  it('should be defined', () => {
    expect(getChatsGuestHandler).toBeDefined();
  });

  it('should call chatRepository.findBy and return chats for guestId', async () => {
    const guestId = 'test-guest-id';
    const expectedChats = [
      { id: 1, name: 'Chat 1', guestId: 'test-guest-id' },
      { id: 2, name: 'Chat 2', guestId: 'test-guest-id' },
    ];

    mockChatRepository.findBy.mockResolvedValue(expectedChats);

    const query = new GetChatsGuestQuery(guestId);
    const result = await getChatsGuestHandler.execute(query);

    expect(mockChatRepository.findBy).toHaveBeenCalledWith({ guestId });
    expect(result).toEqual(expectedChats);
  });
});
