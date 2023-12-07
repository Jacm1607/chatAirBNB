import { GetAllMessagesOfChatHandler } from './get-all-messages-of-chat.handler';
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

	it('debe definirse', () => {
		expect(getAllMessagesOfChatHandler).toBeDefined();
	});

	it('debe obtener todos los mensajes de un chat', async () => {
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

		mockMessageRepository.findBy.mockResolvedValue(expectedMessages);

		const query = new GetAllMessagesOfChatQuery(chatId);
		const result = await getAllMessagesOfChatHandler.execute(query);

		expect(mockMessageRepository.findBy).toHaveBeenCalledWith({ chatId });
		expect(result).toEqual(expectedMessages);
	});
});
