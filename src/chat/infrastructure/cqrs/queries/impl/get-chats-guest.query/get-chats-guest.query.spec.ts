import { GetChatsGuestQuery } from './get-chats-guest.query'; // Asegúrate de que la ruta sea correcta

describe('GetChatsGuestQuery', () => {
  it('should create an instance of GetChatsGuestQuery with guestId', () => {
    const guestId = 'guest-id';

    const query = new GetChatsGuestQuery(guestId);

    expect(query).toBeDefined();
    expect(query.guestId).toEqual(guestId);
  });
});
