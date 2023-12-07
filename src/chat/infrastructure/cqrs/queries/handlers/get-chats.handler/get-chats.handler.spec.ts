import { GetChatsHandler } from './get-chats.handler';
import { Repository } from 'typeorm';
import { ChatModel } from 'src/chat/infrastructure/model/chat.model';

describe('GetChatsHandler', () => {
	let getChatsHandler: GetChatsHandler;
	let chatRepository: Repository<ChatModel>;

	const mockChatRepository = {
		find: jest.fn(),
	};

	beforeEach(() => {
		chatRepository = mockChatRepository as unknown as Repository<ChatModel>;
		getChatsHandler = new GetChatsHandler(chatRepository);
	});

	it('debe definirse', () => {
		expect(getChatsHandler).toBeDefined();
	});

	it('debe llamar a chatRepository.find y devolver todos los chats', async () => {
		const expectedChats = [
			{
				id: 1,
				uuid: '84b54d1a-05dd-455a-8f46-e64fb4b37a70',
				hostId: '13a02f9c-a037-4b43-88c4-34352f14abd0',
				guestId: '284a1ecf-f54f-4a08-83c6-add315d4730b',
				name: 'Chat 1',
				timestamp: '2023-09-07T20:46:47.148Z',
			},
			{
				id: 2,
				uuid: '25c4d17b-44da-4d95-b9b0-3473163065dc',
				hostId: '13a02f9c-a037-4b43-88c4-34352f14abd0',
				guestId: '284a1ecf-f54f-4a08-83c6-add315d4730b',
				name: 'Chat 1',
				timestamp: '2023-09-07T20:52:21.452Z',
			},
			{
				id: 3,
				uuid: 'd6116b4e-21bd-46d1-a1d4-e7e869bfa33f',
				hostId: 'f21c15b0-29fc-450c-b009-e34999727e75',
				guestId: '11ad0d38-d694-45bb-9463-c45bdb0b1084',
				name: 'Chat 4',
				timestamp: '2023-09-08T20:36:12.725Z',
			},
		];
		mockChatRepository.find.mockResolvedValue(expectedChats);
		const result = await getChatsHandler.execute();

		expect(mockChatRepository.find).toHaveBeenCalled();
		expect(result).toEqual(expectedChats);
	});
});
