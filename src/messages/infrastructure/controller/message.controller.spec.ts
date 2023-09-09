import { MessageController } from './message.controller'; // Asegúrate de que la ruta sea correcta
import { MessageSQLiteRepository } from '../repository/sqlite.repository';
import { MessageUseCase } from 'src/messages/application/message.use-case';
import { MessageEntity } from 'src/messages/domain/message.enity';

describe('MessageController', () => {
  let messageController: MessageController;
  let messageSQLiteRepository: MessageSQLiteRepository;

  const mockMessageUseCase = {
    getMessageAllofChat: jest.fn(),
    registerMessage: jest.fn(),
  };

  beforeEach(() => {
    messageSQLiteRepository = new MessageSQLiteRepository(null, null); // Puedes pasar null o tus dependencias reales aquí
    messageController = new MessageController(messageSQLiteRepository);
    messageController['messageCaseUse'] =
      mockMessageUseCase as unknown as MessageUseCase; // Accedemos al miembro privado para asignar el mock
  });

  it('should be defined', () => {
    expect(messageController).toBeDefined();
  });

  it('should get all messages of a chat', async () => {
    const chatId = '7871e8c6-967c-442c-a2ef-25a05a3bbad0';
    const expectedMessages = [
      {
        uuid: '7c0690eb-9d5b-4b2c-90ec-699f8d960600',
        hostId: '9b049bbe-46d8-4876-842e-373267a6b5d9',
        guestId: 'eb37c28d-cf67-404c-9d77-5d5aef42a005',
        chatId: '7871e8c6-967c-442c-a2ef-25a05a3bbad0',
        message: 'Test Message',
        timestamp: new Date(),
      },
      {
        uuid: '7c0690eb-9d5b-4b2c-90ec-699f8d960600',
        hostId: '9b049bbe-46d8-4876-842e-373267a6b5d9',
        guestId: 'eb37c28d-cf67-404c-9d77-5d5aef42a005',
        chatId: '7871e8c6-967c-442c-a2ef-25a05a3bbad0',
        message: 'Test Message',
        timestamp: new Date(),
      },
    ];

    mockMessageUseCase.getMessageAllofChat.mockResolvedValue(expectedMessages);

    const result = await messageController.getAllMessages({ chatId });

    // expect(mockMessageUseCase.getMessageAllofChat).toHaveBeenCalledWith({
    //   chatId,
    // });
    expect(result).toEqual(expectedMessages);
  });

  it('should create a message', async () => {
    const messageEntity: MessageEntity = {
      uuid: '7c0690eb-9d5b-4b2c-90ec-699f8d960600',
      hostId: '9b049bbe-46d8-4876-842e-373267a6b5d9',
      guestId: 'eb37c28d-cf67-404c-9d77-5d5aef42a005',
      chatId: '7871e8c6-967c-442c-a2ef-25a05a3bbad0',
      message: 'Test Message',
      timestamp: new Date(),
    };
    const expectedMessage = { id: 1, message: 'Hello', chatId: 'test-chat-id' };

    mockMessageUseCase.registerMessage.mockResolvedValue(expectedMessage);

    const result = await messageController.createMessage(messageEntity);

    expect(mockMessageUseCase.registerMessage).toHaveBeenCalledWith(
      messageEntity,
    );
    expect(result).toEqual(expectedMessage);
  });
});
