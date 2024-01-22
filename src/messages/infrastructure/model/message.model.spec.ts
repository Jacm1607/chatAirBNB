import { MessageModel } from './message.model';
import { instance, mock, when } from 'ts-mockito';

describe('MessageModel', () => {
	const _message = {
		id: 1,
		uuid: '7c0690eb-9d5b-4b2c-90ec-699f8d960600',
		userId: '9b049bbe-46d8-4876-842e-373267a6b5d9',
		chatId: '7871e8c6-967c-442c-a2ef-25a05a3bbad0',
		message: 'Test Message',
		timestamp: new Date(),
	};

	it('debe crear una instancia del MessageModel', () => {
		const messageModel = new MessageModel();
		expect(messageModel).toBeInstanceOf(MessageModel);
	});

	it('debe establecer las propiedades correctamente', () => {
		const messageModel = new MessageModel();
		messageModel.id = 1;
		messageModel.uuid = '7c0690eb-9d5b-4b2c-90ec-699f8d960600';
		messageModel.userId = '9b049bbe-46d8-4876-842e-373267a6b5d9';
		messageModel.chatId = '7871e8c6-967c-442c-a2ef-25a05a3bbad0';
		messageModel.message = 'Test Message';
		messageModel.timestamp = new Date();

		expect(messageModel.uuid).toBe(_message.uuid);
		expect(messageModel.userId).toBe(_message.userId);
		expect(messageModel.chatId).toBe(_message.chatId);
		expect(messageModel.message).toBe(_message.message);
		expect(messageModel.timestamp).toBeInstanceOf(Date);
	});

	it('debe simular una instancia de MessageModel', () => {
		const mockMessageModel = mock(MessageModel);

		when(mockMessageModel.uuid).thenReturn(_message.uuid);
		when(mockMessageModel.userId).thenReturn(_message.userId);
		when(mockMessageModel.chatId).thenReturn(_message.chatId);
		when(mockMessageModel.message).thenReturn(_message.message);
		when(mockMessageModel.timestamp).thenReturn(new Date());

		const messageModel = instance(mockMessageModel);

		expect(messageModel.uuid).toBe(_message.uuid);
		expect(messageModel.userId).toBe(_message.userId);
		expect(messageModel.chatId).toBe(_message.chatId);
		expect(messageModel.message).toBe(_message.message);
		expect(messageModel.timestamp).toBeInstanceOf(Date);
	});
});
