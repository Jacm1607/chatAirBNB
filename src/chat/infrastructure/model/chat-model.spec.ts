import { mock, instance, when } from 'ts-mockito';
import { ChatModel } from './chat.model';

describe('ChatModel', () => {
  const _chat = {
    id: 1,
    uuid: '7c0690eb-9d5b-4b2c-90ec-699f8d960600',
    hostId: '9b049bbe-46d8-4876-842e-373267a6b5d9',
    guestId: 'eb37c28d-cf67-404c-9d77-5d5aef42a005',
    name: 'Test Chat',
    timestamp: new Date(),
  };

  it('should create an instance of ChatModel', () => {
    const chatModel = new ChatModel();
    expect(chatModel).toBeInstanceOf(ChatModel);
  });

  // it('should have the correct properties', () => {
  //   const chatModel = new ChatModel();
  //   console.log(JSON.stringify(chatModel))
  //   expect(chatModel).toHaveProperty('id');
  //   expect(chatModel).toHaveProperty('uuid');
  //   expect(chatModel).toHaveProperty('hostId');
  //   expect(chatModel).toHaveProperty('guestId');
  //   expect(chatModel).toHaveProperty('name');
  //   expect(chatModel).toHaveProperty('timestamp');
  // });

  it('should set properties correctly', () => {
    const chatModel = new ChatModel();
    chatModel.id = 1;
    chatModel.uuid = '7c0690eb-9d5b-4b2c-90ec-699f8d960600';
    chatModel.hostId = '9b049bbe-46d8-4876-842e-373267a6b5d9';
    chatModel.guestId = 'eb37c28d-cf67-404c-9d77-5d5aef42a005';
    chatModel.name = 'Test Chat';
    chatModel.timestamp = new Date();

    // expect(chatModel.id).toBe(1);
    expect(chatModel.uuid).toBe(_chat.uuid);
    expect(chatModel.hostId).toBe(_chat.hostId);
    expect(chatModel.guestId).toBe(_chat.guestId);
    expect(chatModel.name).toBe('Test Chat');
    expect(chatModel.timestamp).toBeInstanceOf(Date);
  });

  it('should mock a ChatModel instance', () => {
    // Crear una instancia mock de ChatModel
    const mockChatModel = mock(ChatModel);

    // Configurar el comportamiento esperado
    // when(mockChatModel.id).thenReturn(1);
    when(mockChatModel.uuid).thenReturn(_chat.uuid);
    when(mockChatModel.hostId).thenReturn(_chat.hostId);
    when(mockChatModel.guestId).thenReturn(_chat.guestId);
    when(mockChatModel.name).thenReturn('Mock Chat');
    when(mockChatModel.timestamp).thenReturn(new Date());

    // Obtener una instancia real a partir del mock
    const chatModel = instance(mockChatModel);

    // Probar las propiedades
    // expect(chatModel.id).toBe(1);
    expect(chatModel.uuid).toBe(_chat.uuid);
    expect(chatModel.hostId).toBe(_chat.hostId);
    expect(chatModel.guestId).toBe(_chat.guestId);
    expect(chatModel.name).toBe('Mock Chat');
    expect(chatModel.timestamp).toBeInstanceOf(Date);
  });
});
