import { GetChatsHostQuery } from './get-chats-host.query';

describe('GetChatsHostQuery', () => {
  it('debe crear una instancia de GetChatsHostQuery con hostId', () => {
    const hostId = '130e2492-a21c-4211-b68c-91cb3a39f294';

    const query = new GetChatsHostQuery(hostId);

    expect(query).toBeDefined();
    expect(query.hostId).toEqual(hostId);
  });
});
