import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MessageModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uuid: string;

  @Column({ nullable: true })
  hostId: number;

  @Column({ nullable: true })
  guestId: number;

  @Column()
  chatId: string;

  @Column()
  message: string;

  @Column()
  timestamp: Date;
}
