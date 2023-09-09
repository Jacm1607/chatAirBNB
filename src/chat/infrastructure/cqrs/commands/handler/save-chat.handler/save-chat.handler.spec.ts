import { SaveChatHandler } from './save-chat.handler';
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

  it('debe definirse', () => {
    expect(saveChatHandler).toBeDefined();
  });

  it('debe llamar a chatRepository.insert con los datos de chat correctos', async () => {
    const chatValueObject: ChatValueObject = {
      uuid: '64dffae9-fb30-4139-b1dc-7051d72d37cf',
      hostId: '130e2492-a21c-4211-b68c-91cb3a39f294',
      guestId: 'f21f4103-38e1-42f6-b053-c35680c4e7c4',
      name: 'Chat 1',
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
