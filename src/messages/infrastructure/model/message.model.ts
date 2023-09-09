import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MessageModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uuid: string;

  @Column()
  hostId: string;

  @Column()
  guestId: string;

  @Column()
  chatId: string;

  @Column()
  message: string;

  @Column()
  timestamp: Date;
}
