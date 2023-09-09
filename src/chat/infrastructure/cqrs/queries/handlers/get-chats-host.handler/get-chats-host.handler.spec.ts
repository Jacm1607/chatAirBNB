import { GetChatsHostHandler } from './get-chats-host.handler'; // Asegúrate de que la ruta sea correcta
import { GetChatsHostQuery } from '../../impl/get-chats-host.query/get-chats-host.query';
import { Repository } from 'typeorm';
import { ChatModel } from './../../../../../infrastructure/model/chat.model';

describe('GetChatsHostHandler', () => {
  let getChatsHostHandler: GetChatsHostHandler;
  let chatRepository: Repository<ChatModel>;

  const mockChatRepository = {
    findBy: jest.fn(),
  };

  beforeEach(() => {
    chatRepository = mockChatRepository as unknown as Repository<ChatModel>;
    getChatsHostHandler = new GetChatsHostHandler(chatRepository);
  });

  it('should be defined', () => {
    expect(getChatsHostHandler).toBeDefined();
  });

  it('should call chatRepository.findBy and return chats for hostId', async () => {
    const hostId = 'test-host-id';
    const expectedChats = [
      { id: 1, name: 'Chat 1', hostId: 'test-host-id' },
      { id: 2, name: 'Chat 2', hostId: 'test-host-id' },
    ];

    mockChatRepository.findBy.mockResolvedValue(expectedChats);

    const query = new GetChatsHostQuery(hostId);
    const result = await getChatsHostHandler.execute(query);

    expect(mockChatRepository.findBy).toHaveBeenCalledWith({ hostId });
    expect(result).toEqual(expectedChats);
  });
});
