import { GetAllMessagesOfChatHandler } from './get-all-messages-of-chat.handler'; // Asegúrate de que la ruta sea correcta
import { GetAllMessagesOfChatQuery } from '../../impl/get-all-messages-of-chat.query/get-all-messages-of-chat.query';
import { Repository } from 'typeorm';
import { MessageModel } from './../../../../../infrastructure/model/message.model';

describe('GetAllMessagesOfChatHandler', () => {
  let getAllMessagesOfChatHandler: GetAllMessagesOfChatHandler;
  let messageRepository: Repository<MessageModel>;

  const mockMessageRepository = {
    findBy: jest.fn(),
  };

  beforeEach(() => {
    messageRepository =
      mockMessageRepository as unknown as Repository<MessageModel>;
    getAllMessagesOfChatHandler = new GetAllMessagesOfChatHandler(
      messageRepository,
    );
  });

  it('should be defined', () => {
    expect(getAllMessagesOfChatHandler).toBeDefined();
  });

  it('should get all messages of a chat', async () => {
    const chatId = 'test-chat-id';

    const expectedMessages = [
      { id: 1, message: 'Message 1', chatId },
      { id: 2, message: 'Message 2', chatId },
    ];

    mockMessageRepository.findBy.mockResolvedValue(expectedMessages);

    const query = new GetAllMessagesOfChatQuery(chatId);
    const result = await getAllMessagesOfChatHandler.execute(query);

    expect(mockMessageRepository.findBy).toHaveBeenCalledWith({ chatId });
    expect(result).toEqual(expectedMessages);
  });
});
