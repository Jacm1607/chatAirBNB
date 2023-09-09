import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { MessageModel } from './message.model'; // Asegúrate de que la ruta sea correcta
import { instance, mock, when } from 'ts-mockito';

describe('MessageModel', () => {
  const _message = {
    id: 1,
    uuid: '7c0690eb-9d5b-4b2c-90ec-699f8d960600',
    hostId: '9b049bbe-46d8-4876-842e-373267a6b5d9',
    guestId: 'eb37c28d-cf67-404c-9d77-5d5aef42a005',
    chatId: '7871e8c6-967c-442c-a2ef-25a05a3bbad0',
    message: 'Test Message',
    timestamp: new Date(),
  };

  it('should create an instance of MessageModel', () => {
    const messageModel = new MessageModel();
    expect(messageModel).toBeInstanceOf(MessageModel);
  });

  it('should set properties correctly', () => {
    const messageModel = new MessageModel();
    messageModel.id = 1;
    messageModel.uuid = '7c0690eb-9d5b-4b2c-90ec-699f8d960600';
    messageModel.hostId = '9b049bbe-46d8-4876-842e-373267a6b5d9';
    messageModel.guestId = 'eb37c28d-cf67-404c-9d77-5d5aef42a005';
    messageModel.chatId = '7871e8c6-967c-442c-a2ef-25a05a3bbad0';
    messageModel.message = 'Test Message';
    messageModel.timestamp = new Date();

    expect(messageModel.uuid).toBe(_message.uuid);
    expect(messageModel.hostId).toBe(_message.hostId);
    expect(messageModel.guestId).toBe(_message.guestId);
    expect(messageModel.chatId).toBe(_message.chatId);
    expect(messageModel.message).toBe(_message.message);
    expect(messageModel.timestamp).toBeInstanceOf(Date);
  });

  it('should mock a MessageModel instance', () => {
    // Crear una instancia mock de ChatModel
    const mockMessageModel = mock(MessageModel);

    // Configurar el comportamiento esperado
    // when(mockChatModel.id).thenReturn(1);
    when(mockMessageModel.uuid).thenReturn(_message.uuid);
    when(mockMessageModel.hostId).thenReturn(_message.hostId);
    when(mockMessageModel.guestId).thenReturn(_message.guestId);
    when(mockMessageModel.chatId).thenReturn(_message.chatId);
    when(mockMessageModel.message).thenReturn(_message.message);
    when(mockMessageModel.timestamp).thenReturn(new Date());

    // Obtener una instancia real a partir del mock
    const messageModel = instance(mockMessageModel);

    // Probar las propiedades
    // expect(chatModel.id).toBe(1);
    expect(messageModel.uuid).toBe(_message.uuid);
    expect(messageModel.hostId).toBe(_message.hostId);
    expect(messageModel.guestId).toBe(_message.guestId);
    expect(messageModel.chatId).toBe(_message.chatId);
    expect(messageModel.message).toBe(_message.message);
    expect(messageModel.timestamp).toBeInstanceOf(Date);
  });
});
