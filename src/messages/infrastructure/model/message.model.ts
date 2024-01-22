import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MessageModel {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	uuid: string;

	@Column()
	userId: string;

	@Column()
	chatId: string;

	@Column()
	message: string;

	@Column()
	timestamp: Date;
}
