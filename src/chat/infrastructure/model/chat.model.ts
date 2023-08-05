import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ChatModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uuid: string;

  @Column()
  hostId: number;

  @Column()
  guestId: number;

  @Column()
  name: string;

  @Column()
  timestamp: Date;
}
