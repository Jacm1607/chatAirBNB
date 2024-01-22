import { MessageValueObject } from './message.value-object';

describe('MessageValueObject', () => {
	it('debe crear una instancia con los valores proporcionados', () => {
		const userId = 'ca518f3e-dc07-4d65-a816-88bbb75ffff4';
		const chatId = '62ba0bc5-184f-4672-92b6-94424758c1ac';
		const message = 'Test message';

		const messageValueObject = new MessageValueObject({
			userId,
			chatId,
			message,
		});

		expect(messageValueObject).toBeDefined();
		expect(messageValueObject.uuid).toBeDefined();
		expect(messageValueObject.userId).toEqual(userId);
		expect(messageValueObject.chatId).toEqual(chatId);
		expect(messageValueObject.message).toEqual(message);
		expect(messageValueObject.timestamp).toBeDefined();
	});
});
