import { v4 as uuid } from 'uuid';
import { ChatEntity } from './chat.entity';

export class ChatValueObject implements ChatEntity {
	uuid: string;
	guestId: string;
	hostId: string;
	name: string;
	timestamp: Date;

	constructor({
		guestId,
		hostId,
		name,
	}: {
		guestId: string;
		hostId: string;
		name: string;
	}) {
		this.uuid = uuid();
		this.guestId = guestId;
		this.hostId = hostId;
		this.name = name;
		this.timestamp = new Date();
	}
}
