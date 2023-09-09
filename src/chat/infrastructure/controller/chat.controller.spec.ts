import { Test, TestingModule } from '@nestjs/testing';
import { ChatController } from './chat.controller';
import { ChatSQLiteRepository } from '../repository/sqlite.repository';
import { BadRequestException } from '@nestjs/common';
import { ChatUseCase } from './../../application/chat.use-case';

describe('ChatController', () => {
  let chatController: ChatController;
  let chatUseCase: ChatUseCase;

  const mockChatUseCase = {
    getChatAll: jest.fn(),
    getChatGuest: jest.fn(),
    getChatHost: jest.fn(),
    registerChat: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatController],
      providers: [
        {
          provide: ChatSQLiteRepository, // Proporciona el mock en lugar del repositorio real
          useValue: {},
        },
        {
          provide: ChatUseCase, // Proporciona el mock del ChatUseCase
          useValue: mockChatUseCase,
        },
      ],
    }).compile();

    chatController = module.get<ChatController>(ChatController);
    chatUseCase = module.get<ChatUseCase>(ChatUseCase);
  });

  // describe('getAllChat', () => {
  //   it('should return all chats', async () => {
  //     const expectedChats = [
  //       { id: 1, name: 'Chat 1' },
  //       { id: 2, name: 'Chat 2' },
  //     ];

  //     mockChatUseCase.getChatAll.mockResolvedValue(expectedChats);

  //     const result = await chatController.getAllChat();
  //     console.log(result)
  //     expect(result).toEqual(expectedChats);
  //   });
  // });

  describe('getChatGuest', () => {
    it('should return chat for valid guestId', async () => {
      const validGuestId = 'valid-guest-id';
      const expectedChat = { id: 3, name: 'Chat 3' };

      mockChatUseCase.getChatGuest.mockResolvedValue(expectedChat);
      try {
        const result = await chatController.getChatGuest({
          guestId: validGuestId,
        });

        expect(result).toEqual(expectedChat);
      } catch (error) {
        // Verifica que la excepción sea de tipo BadRequestException
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });

    it('should throw BadRequestException for invalid guestId', async () => {
      const invalidGuestId = 'invalid-guest-id';

      mockChatUseCase.getChatGuest.mockRejectedValue(new BadRequestException());

      try {
        await chatController.getChatGuest({ guestId: invalidGuestId });
        // Si no se lanza la excepción, la prueba debería fallar
        fail('Expected BadRequestException to be thrown');
      } catch (error) {
        // Verifica que la excepción sea de tipo BadRequestException
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });

  // Similarmente, puedes escribir pruebas para otros métodos como getChatHost y createChat

  afterAll(() => {
    jest.clearAllMocks();
  });
});
