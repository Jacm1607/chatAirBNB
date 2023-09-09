import { GetChatsHostQuery } from './get-chats-host.query'; // Asegúrate de que la ruta sea correcta

describe('GetChatsHostQuery', () => {
  it('should create an instance of GetChatsHostQuery with hostId', () => {
    const hostId = 'host-id';

    const query = new GetChatsHostQuery(hostId);

    expect(query).toBeDefined();
    expect(query.hostId).toEqual(hostId);
  });
});
