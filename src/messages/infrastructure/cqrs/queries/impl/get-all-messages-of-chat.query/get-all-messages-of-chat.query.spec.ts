import { GetAllMessagesOfChatQuery } from './get-all-messages-of-chat.query';

describe('GetAllMessagesOfChatQuery', () => {
  it('debe crear una instancia con el chatId proporcionado', () => {
    const chatId = '84b54d1a-05dd-455a-8f46-e64fb4b37a70';

    const query = new GetAllMessagesOfChatQuery(chatId);

    expect(query).toBeDefined();
    expect(query.chatId).toEqual(chatId);
  });
});
