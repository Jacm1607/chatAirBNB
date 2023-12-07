import { MessageUseCase } from './message.use-case';

describe('MessageUseCase', () => {
	let messageUseCase: MessageUseCase;
	let messageRepository: any;

	beforeEach(() => {
		messageRepository = {
			createMessage: jest.fn(),
			getAllMessageOfChat: jest.fn(),
		};
		messageUseCase = new MessageUseCase(messageRepository);
	});

	it('debe estar definido', () => {
		expect(messageUseCase).toBeDefined();
	});

	it('debe registrar el mensaje', async () => {
		const guestId = '8356251a-3485-44da-9455-98d6d711d3b3';
		const hostId = 'ca518f3e-dc07-4d65-a816-88bbb75ffff4';
		const chatId = '44f78af5-1b58-4d00-8c6f-9f4ce0e6e049';
		const message = 'Test message';

		const expectedMessage = { id: 1, message, chatId };

		messageRepository.createMessage.mockResolvedValue(expectedMessage);

		const result = await messageUseCase.registerMessage({
			guestId,
			hostId,
			chatId,
			message,
		});

		expect(messageRepository.createMessage).toHaveBeenCalledWith(
			expect.any(Object),
		);
		expect(result).toEqual(expectedMessage);
	});

	it('debe obtener todos los mensajes del chat', async () => {
		const chatId = '44f78af5-1b58-4d00-8c6f-9f4ce0e6e049';

		const expectedMessages = [
			{
				id: 1,
				uuid: 'a6a5b284-66ce-4bab-ae6a-d700b5dcde3a',
				hostId: '13a02f9c-a037-4b43-88c4-34352f14abd0',
				guestId: '284a1ecf-f54f-4a08-83c6-add315d4730b',
				chatId: '84b54d1a-05dd-455a-8f46-e64fb4b37a70',
				message: 'Message 1',
				timestamp: '2023-09-07T21:04:16.686Z',
			},
			{
				id: 2,
				uuid: '2e441433-1ca0-4ecb-a714-5faa16feef5e',
				hostId: '13a02f9c-a037-4b43-88c4-34352f14abd0',
				guestId: '284a1ecf-f54f-4a08-83c6-add315d4730b',
				chatId: '84b54d1a-05dd-455a-8f46-e64fb4b37a70',
				message: 'Message 1',
				timestamp: '2023-09-08T20:38:16.930Z',
			},
		];

		messageRepository.getAllMessageOfChat.mockResolvedValue(expectedMessages);

		const result = await messageUseCase.getMessageAllofChat({ chatId });

		// expect(messageRepository.getAllMessageOfChat).toHaveBeenCalledWith(chatId);
		expect(result).toEqual(expectedMessages);
	});
});
