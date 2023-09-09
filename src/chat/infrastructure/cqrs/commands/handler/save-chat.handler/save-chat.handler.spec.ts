import { SaveChatHandler } from './save-chat.handler'; // Asegúrate de que la ruta sea correcta
import { Repository } from 'typeorm';
import { ChatValueObject } from './../../../../../domain/chat.value-object';
import { ChatModel } from './../../../../../infrastructure/model/chat.model';

describe('SaveChatHandler', () => {
  let saveChatHandler: SaveChatHandler;
  let chatRepository: Repository<ChatModel>;

  const mockChatRepository = {
    insert: jest.fn(),
  };

  beforeEach(() => {
    chatRepository = mockChatRepository as unknown as Repository<ChatModel>;
    saveChatHandler = new SaveChatHandler(chatRepository);
  });

  it('should be defined', () => {
    expect(saveChatHandler).toBeDefined();
  });

  it('should call chatRepository.insert with correct chat data', async () => {
    const chatValueObject: ChatValueObject = {
      uuid: 'test-uuid',
      guestId: 'test-guest-id',
      hostId: 'test-host-id',
      name: 'Test Chat',
      timestamp: new Date(),
    };

    await saveChatHandler.execute(chatValueObject);

    const expectedChatModel = new ChatModel();
    expectedChatModel.uuid = chatValueObject.uuid;
    expectedChatModel.guestId = chatValueObject.guestId;
    expectedChatModel.hostId = chatValueObject.hostId;
    expectedChatModel.name = chatValueObject.name;
    expectedChatModel.timestamp = chatValueObject.timestamp;

    expect(mockChatRepository.insert).toHaveBeenCalledWith(expectedChatModel);
  });
});
