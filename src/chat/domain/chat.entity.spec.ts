import { ChatEntity } from "./chat.entity";

describe('ChatEntity', () => {
  it('debería crear una instancia válida de ChatEntity', () => {
    const chat: ChatEntity = {
      uuid: 'some-uuid',
      guestId: 1,
      hostId: 2,
      name: 'Ejemplo',
      timestamp: new Date(),
    };

    expect(chat).toBeDefined();
    expect(chat.uuid).toBe('some-uuid');
    expect(chat.guestId).toBe(1);
    expect(chat.hostId).toBe(2);
    expect(chat.name).toBe('Ejemplo');
    expect(chat.timestamp).toBeInstanceOf(Date);
  });

  it('debería requerir todos los valores', () => {
    const chat: ChatEntity = {
      uuid: 'some-uuid',
      guestId: 1,
      hostId: 2,
      name: 'Ejemplo',
      timestamp: new Date(),
    };

    chat.uuid = null!;
    chat.guestId = undefined!;
    chat.hostId = undefined!;
    chat.name = null!;
    chat.timestamp = undefined!;

    expect(chat).toBeDefined();
    expect(chat.uuid).toBeNull();
    expect(chat.guestId).toBeUndefined();
    expect(chat.hostId).toBeUndefined();
    expect(chat.name).toBeNull();
    expect(chat.timestamp).toBeUndefined();
  });
});
