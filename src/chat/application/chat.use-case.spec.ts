import { ChatUseCase } from './chat.use-case';

// Mock del ChatRepository
const chatRepositoryMock = {
  createChat: jest.fn(),
  getAllChatHost: jest.fn(),
  getAllChatGuest: jest.fn(),
  getAllChat: jest.fn(),
};

// Instancia del ChatUseCase con el mock del ChatRepository
const chatUseCase = new ChatUseCase(chatRepositoryMock);

describe('ChatUseCase', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Limpia los mocks después de cada prueba
  });

  it('should register a chat', async () => {
    const chatData = {
      guestId: 'guest-id',
      hostId: 'host-id',
      name: 'Test Chat',
    };

    const chatValue = { ...chatData }; // Valor esperado

    chatRepositoryMock.createChat.mockResolvedValue(chatValue);

    const chatCreated = await chatUseCase.registerChat(chatData);

    expect(chatCreated).toEqual(chatValue);
    // expect(chatRepositoryMock.createChat).toHaveBeenCalledWith(chatValue);
  });

  it('should get chats hosted by a host', async () => {
    const hostId = 'host-id';
    const chatsHost = [
      { id: 1, name: 'Chat 1' },
      { id: 2, name: 'Chat 2' },
    ]; // Valores esperados

    chatRepositoryMock.getAllChatHost.mockResolvedValue(chatsHost);

    const result = await chatUseCase.getChatHost({ hostId });

    expect(result).toEqual(chatsHost);
    expect(chatRepositoryMock.getAllChatHost).toHaveBeenCalledWith(hostId);
  });

  it('should get chats where a user is a guest', async () => {
    const guestId = 'guest-id';
    const chatsGuest = [
      { id: 3, name: 'Chat 3' },
      { id: 4, name: 'Chat 4' },
    ]; // Valores esperados

    chatRepositoryMock.getAllChatGuest.mockResolvedValue(chatsGuest);

    const result = await chatUseCase.getChatGuest({ guestId });

    expect(result).toEqual(chatsGuest);
    expect(chatRepositoryMock.getAllChatGuest).toHaveBeenCalledWith(guestId);
  });

  it('should get all chats', async () => {
    const chatsGet = [
      { id: 5, name: 'Chat 5' },
      { id: 6, name: 'Chat 6' },
    ]; // Valores esperados

    chatRepositoryMock.getAllChat.mockResolvedValue(chatsGet);

    const result = await chatUseCase.getChatAll();

    expect(result).toEqual(chatsGet);
    expect(chatRepositoryMock.getAllChat).toHaveBeenCalled();
  });
});
