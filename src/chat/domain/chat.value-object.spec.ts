import { v4 as uuid } from 'uuid';
import { ChatValueObject } from './chat.value-object';

describe('ChatValueObject', () => {
	it('crea una instancia de ChatValueObject', () => {
		const chatValueObject = new ChatValueObject({
			guestId: uuid(),
			hostId: uuid(),
			name: 'Test Chat',
		});

		expect(chatValueObject).toBeInstanceOf(ChatValueObject);
	});

	it('debe tener las propiedades correctas establecidas', () => {
		const guestId = uuid();
		const hostId = uuid();
		const name = 'Test Chat';

		const chatValueObject = new ChatValueObject({
			guestId,
			hostId,
			name,
		});

		expect(chatValueObject.guestId).toBe(guestId);
		expect(chatValueObject.hostId).toBe(hostId);
		expect(chatValueObject.name).toBe(name);
	});

	it('debe generar un UUID para cada instancia', () => {
		const chatValueObject1 = new ChatValueObject({
			guestId: uuid(),
			hostId: uuid(),
			name: 'Chat 1',
		});

		const chatValueObject2 = new ChatValueObject({
			guestId: uuid(),
			hostId: uuid(),
			name: 'Chat 2',
		});

		expect(chatValueObject1.uuid).not.toBe(chatValueObject2.uuid);
	});

	it('debe establecer una marca de tiempo cuando se crea', () => {
		const chatValueObject = new ChatValueObject({
			guestId: uuid(),
			hostId: uuid(),
			name: 'Test Chat',
		});

		expect(chatValueObject.timestamp).toBeInstanceOf(Date);
	});
});
