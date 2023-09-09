import { MessageUseCase } from './message.use-case';

describe('MessageUseCase', () => {
  let messageUseCase: MessageUseCase;
  let messageRepository: any; // Puedes utilizar un mock para el repository

  beforeEach(() => {
    messageRepository = {
      createMessage: jest.fn(),
      getAllMessageOfChat: jest.fn(),
    };
    messageUseCase = new MessageUseCase(messageRepository);
  });

  it('should be defined', () => {
    expect(messageUseCase).toBeDefined();
  });

  it('should register a message', async () => {
    const guestId = '8356251a-3485-44da-9455-98d6d711d3b3';
    const hostId = 'ca518f3e-dc07-4d65-a816-88bbb75ffff4';
    const chatId = '62ba0bc5-184f-4672-92b6-94424758c1ac';
    const message = 'Test message';

    const expectedMessage = { id: 1, message, chatId };

    messageRepository.createMessage.mockResolvedValue(expectedMessage);

    const result = await messageUseCase.registerMessage({
      guestId,
      hostId,
      chatId,
      message,
    });

    expect(messageRepository.createMessage).toHaveBeenCalledWith(
      expect.any(Object),
    );
    expect(result).toEqual(expectedMessage);
  });

  it('should get all messages of a chat', async () => {
    const chatId = 'test-chat-id';

    const expectedMessages = [
      { id: 1, message: 'Message 1', chatId },
      { id: 2, message: 'Message 2', chatId },
    ];

    messageRepository.getAllMessageOfChat.mockResolvedValue(expectedMessages);

    const result = await messageUseCase.getMessageAllofChat({ chatId });

    expect(messageRepository.getAllMessageOfChat).toHaveBeenCalledWith(chatId);
    expect(result).toEqual(expectedMessages);
  });
});
