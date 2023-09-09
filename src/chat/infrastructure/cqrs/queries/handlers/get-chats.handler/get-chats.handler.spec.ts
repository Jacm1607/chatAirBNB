import { GetChatsHandler } from './get-chats.handler'; // Asegúrate de que la ruta sea correcta
import { GetChatsQuery } from '../../impl/get-chats.query/get-chats.query';
import { Repository } from 'typeorm';
import { ChatModel } from 'src/chat/infrastructure/model/chat.model';

describe('GetChatsHandler', () => {
  let getChatsHandler: GetChatsHandler;
  let chatRepository: Repository<ChatModel>;

  const mockChatRepository = {
    find: jest.fn(),
  };

  beforeEach(() => {
    chatRepository = mockChatRepository as unknown as Repository<ChatModel>;
    getChatsHandler = new GetChatsHandler(chatRepository);
  });

  it('should be defined', () => {
    expect(getChatsHandler).toBeDefined();
  });

  it('should call chatRepository.find and return chats', async () => {
    const expectedChats = [
      { id: 1, name: 'Chat 1' },
      { id: 2, name: 'Chat 2' },
    ];
    mockChatRepository.find.mockResolvedValue(expectedChats);

    const query = new GetChatsQuery();
    const result = await getChatsHandler.execute(query);

    expect(mockChatRepository.find).toHaveBeenCalled();
    expect(result).toEqual(expectedChats);
  });
});
