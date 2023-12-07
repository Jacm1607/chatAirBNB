import { ChatUseCase } from './chat.use-case';

const chatRepositoryMock = {
	createChat: jest.fn(),
	getAllChatHost: jest.fn(),
	getAllChatGuest: jest.fn(),
	getAllChat: jest.fn(),
};

const chatUseCase = new ChatUseCase(chatRepositoryMock);

describe('ChatUseCase', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('registrar un chat', async () => {
		const chatData = {
			hostId: '13a02f9c-a037-4b43-88c4-34352f14abd0',
			guestId: '284a1ecf-f54f-4a08-83c6-add315d4730b',
			message: 'Message 1',
		};

		const chatValue = { ...chatData };

		chatRepositoryMock.createChat.mockResolvedValue(chatValue);

		const chatCreated = await chatUseCase.registerChat(chatData);

		expect(chatCreated).toEqual(chatValue);
	});

	it('chats que pertenece al anfitrión', async () => {
		const hostId = '130e2492-a21c-4211-b68c-91cb3a39f294';
		const chatsHost = [
			{
				id: 4,
				uuid: '64dffae9-fb30-4139-b1dc-7051d72d37cf',
				hostId: '130e2492-a21c-4211-b68c-91cb3a39f294',
				guestId: 'f21f4103-38e1-42f6-b053-c35680c4e7c4',
				name: 'Chat 1',
				timestamp: '2023-09-08T20:36:12.814Z',
			},
			{
				id: 8,
				uuid: '9b5a4359-c2be-44a6-a11a-b793d8e7299c',
				hostId: '130e2492-a21c-4211-b68c-91cb3a39f294',
				guestId: 'f21f4103-38e1-42f6-b053-c35680c4e7c4',
				name: 'Chat 1',
				timestamp: '2023-09-08T20:36:13.139Z',
			},
		];

		chatRepositoryMock.getAllChatHost.mockResolvedValue(chatsHost);

		const result = await chatUseCase.getChatHost({ hostId });

		expect(result).toEqual(chatsHost);
		expect(chatRepositoryMock.getAllChatHost).toHaveBeenCalledWith(hostId);
	});

	it('chats que pertenece al huesped', async () => {
		const guestId = 'f21f4103-38e1-42f6-b053-c35680c4e7c4';
		const chatsGuest = [
			{
				id: 16,
				uuid: 'a1c3f9ff-d547-46f0-bf43-65d7cd69bd9c',
				hostId: '130e2492-a21c-4211-b68c-91cb3a39f294',
				guestId: 'f21f4103-38e1-42f6-b053-c35680c4e7c4',
				name: 'Chat 1',
				timestamp: '2023-09-08T20:36:47.504Z',
			},
			{
				id: 20,
				uuid: '9a9930d0-3a74-4ce3-86a8-4a24cf04e99b',
				hostId: '130e2492-a21c-4211-b68c-91cb3a39f294',
				guestId: 'f21f4103-38e1-42f6-b053-c35680c4e7c4',
				name: 'Chat 1',
				timestamp: '2023-09-08T20:36:47.797Z',
			},
		];

		chatRepositoryMock.getAllChatGuest.mockResolvedValue(chatsGuest);

		const result = await chatUseCase.getChatGuest({ guestId });

		expect(result).toEqual(chatsGuest);
		expect(chatRepositoryMock.getAllChatGuest).toHaveBeenCalledWith(guestId);
	});

	it('obtener todos los chats', async () => {
		const chatsGet = [
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

		chatRepositoryMock.getAllChat.mockResolvedValue(chatsGet);

		const result = await chatUseCase.getChatAll();

		expect(result).toEqual(chatsGet);
		expect(chatRepositoryMock.getAllChat).toHaveBeenCalled();
	});
});
