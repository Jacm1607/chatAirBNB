import { GetChatsGuestQuery } from './get-chats-guest.query';

describe('GetChatsGuestQuery', () => {
  it('debe crear una instancia de GetChatsGuestQuery con guestId', () => {
    const guestId = 'f21f4103-38e1-42f6-b053-c35680c4e7c4';

    const query = new GetChatsGuestQuery(guestId);

    expect(query).toBeDefined();
    expect(query.guestId).toEqual(guestId);
  });
});
