import { GetAllMessagesOfChatQuery } from './get-all-messages-of-chat.query'; // Asegúrate de que la ruta sea correcta

describe('GetAllMessagesOfChatQuery', () => {
  it('should create an instance with provided chatId', () => {
    const chatId = 'test-chat-id';

    const query = new GetAllMessagesOfChatQuery(chatId);

    expect(query).toBeDefined();
    expect(query.chatId).toEqual(chatId);
  });
});
