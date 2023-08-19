import { MessageValueObject } from "./message.value-object";

describe('MessageValueObject', () => {
  it('debería crear una instancia válida con guestId', () => {
    const guestId = 1;
    const hostId = 2;
    const chatId = 'some-chat-id';
    const message = 'Hola';

    const messageValue = new MessageValueObject({ guestId, hostId, chatId, message });

    expect(messageValue).toBeDefined();
    expect(messageValue.uuid).toBeDefined();
    expect(messageValue.guestId).toBe(guestId);
    expect(messageValue.hostId).toBe(hostId);
    expect(messageValue.chatId).toBe(chatId);
    expect(messageValue.message).toBe(message);
    expect(messageValue.timestamp).toBeInstanceOf(Date);
  });

  it('debería crear una instancia válida sin guestId', () => {
    const hostId = 2;
    const chatId = 'some-chat-id';
    const message = 'Hola';

    const messageValue = new MessageValueObject({ hostId, chatId, message });

    expect(messageValue).toBeDefined();
    expect(messageValue.uuid).toBeDefined();
    expect(messageValue.guestId).toBeNull();
    expect(messageValue.hostId).toBe(hostId);
    expect(messageValue.chatId).toBe(chatId);
    expect(messageValue.message).toBe(message);
    expect(messageValue.timestamp).toBeInstanceOf(Date);
  });

  it('debería generar un UUID único para cada instancia', () => {
    const messageValue1 = new MessageValueObject({ chatId: 'chat-1', message: 'Hola' });
    const messageValue2 = new MessageValueObject({ chatId: 'chat-2', message: 'Hola' });

    expect(messageValue1.uuid).not.toBe(messageValue2.uuid);
  });

  it('debería actualizar el timestamp en cada instancia', async () => {
    const messageValue1 = new MessageValueObject({ chatId: 'chat-1', message: 'Hola' });
    await new Promise(resolve => setTimeout(resolve, 1000)); // Esperar 1 segundo
    const messageValue2 = new MessageValueObject({ chatId: 'chat-2', message: 'Hola' });
  
    const timestamp1 = messageValue1.timestamp.getTime();
    const timestamp2 = messageValue2.timestamp.getTime();
  
    expect(timestamp2).toBeGreaterThan(timestamp1);
  });
  
});
