import { Test, TestingModule } from '@nestjs/testing';
import { ChatController } from './chat.controller';
import { ChatSQLiteRepository } from '../repository/sqlite.repository';
import { BadRequestException } from '@nestjs/common';
import { ChatUseCase } from './../../application/chat.use-case';

describe('ChatController', () => {
	let chatController: ChatController;

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
					provide: ChatSQLiteRepository,
					useValue: {},
				},
				{
					provide: ChatUseCase,
					useValue: mockChatUseCase,
				},
			],
		}).compile();

		chatController = module.get<ChatController>(ChatController);
	});

	describe('getChatGuest', () => {
		it('debe lanzar BadRequestException para guestId no válido', async () => {
			const invalidGuestId = 'invalid-guest-id';

			mockChatUseCase.getChatGuest.mockRejectedValue(new BadRequestException());

			try {
				await chatController.getChatGuest({ guestId: invalidGuestId });
				fail('Expected BadRequestException to be thrown');
			} catch (error) {
				expect(error).toBeInstanceOf(BadRequestException);
			}
		});
	});

	afterAll(() => {
		jest.clearAllMocks();
	});
});
