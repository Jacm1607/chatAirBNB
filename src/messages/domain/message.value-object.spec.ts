import { MessageValueObject } from './message.value-object';

describe('MessageValueObject', () => {
	it('debe crear una instancia con los valores proporcionados', () => {
		const guestId = '8356251a-3485-44da-9455-98d6d711d3b3';
		const hostId = 'ca518f3e-dc07-4d65-a816-88bbb75ffff4';
		const chatId = '62ba0bc5-184f-4672-92b6-94424758c1ac';
		const message = 'Test message';

		const messageValueObject = new MessageValueObject({
			guestId,
			hostId,
			chatId,
			message,
		});

		expect(messageValueObject).toBeDefined();
		expect(messageValueObject.uuid).toBeDefined();
		expect(messageValueObject.guestId).toEqual(guestId);
		expect(messageValueObject.hostId).toEqual(hostId);
		expect(messageValueObject.chatId).toEqual(chatId);
		expect(messageValueObject.message).toEqual(message);
		expect(messageValueObject.timestamp).toBeDefined();
	});
});
