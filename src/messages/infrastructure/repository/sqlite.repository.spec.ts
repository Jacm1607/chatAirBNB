import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { MessageEntity } from 'src/messages/domain/message.enity';
import { GetAllMessagesOfChatQuery } from '../cqrs/queries/impl/get-all-messages-of-chat.query/get-all-messages-of-chat.query';
import { MessageSQLiteRepository } from './sqlite.repository';

describe('MessageSQLiteRepository', () => {
	let messageSQLiteRepository: MessageSQLiteRepository;
	let queryBus: QueryBus;
	let commandBus: CommandBus;

	const mockQueryBus = {
		execute: jest.fn(),
	};

	const mockCommandBus = {
		execute: jest.fn(),
	};

	beforeEach(() => {
		queryBus = mockQueryBus as unknown as QueryBus;
		commandBus = mockCommandBus as unknown as CommandBus;
		messageSQLiteRepository = new MessageSQLiteRepository(queryBus, commandBus);
	});

	it('debe estar definido', () => {
		expect(messageSQLiteRepository).toBeDefined();
	});

	it('debe obtener todos los mensajes de un chat', async () => {
		const chatId = '44f78af5-1b58-4d00-8c6f-9f4ce0e6e049';

		const expectedMessages = [
			{
				id: 1,
				uuid: 'a6a5b284-66ce-4bab-ae6a-d700b5dcde3a',
				userId: '13a02f9c-a037-4b43-88c4-34352f14abd0',
				chatId: '84b54d1a-05dd-455a-8f46-e64fb4b37a70',
				message: 'Message 1',
				timestamp: '2023-09-07T21:04:16.686Z',
			},
			{
				id: 2,
				uuid: '2e441433-1ca0-4ecb-a714-5faa16feef5e',
				userId: '13a02f9c-a037-4b43-88c4-34352f14abd0',
				chatId: '84b54d1a-05dd-455a-8f46-e64fb4b37a70',
				message: 'Message 1',
				timestamp: '2023-09-08T20:38:16.930Z',
			},
		];

		mockQueryBus.execute.mockResolvedValue(expectedMessages);

		const result = await messageSQLiteRepository.getAllMessageOfChat(chatId);

		expect(mockQueryBus.execute).toHaveBeenCalledWith(
			expect.any(GetAllMessagesOfChatQuery),
		);
		expect(result).toEqual(expectedMessages);
	});

	it('debe crear un mensaje', async () => {
		const messageEntity: MessageEntity = {
			uuid: '84b54d1a-05dd-12a3-8f46-e64fb4b37a70',
			chatId: '84b54d1a-05dd-455a-8f46-e64fb4b37a70',
			userId: '13a02f9c-a037-4b43-88c4-34352f14abd0',
			message: 'Message 1',
			timestamp: new Date(),
		};

		const expectedMessage = { status: 201 };

		mockCommandBus.execute.mockResolvedValue(expectedMessage);

		const result = await messageSQLiteRepository.createMessage(messageEntity);

		expect(mockCommandBus.execute).toHaveBeenCalledWith(messageEntity);
		expect(result).toEqual(expectedMessage);
	});
});
