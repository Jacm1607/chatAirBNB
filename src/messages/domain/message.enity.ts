export interface MessageEntity {
  uuid: string;
  guestId: number;
  hostId: number;
  chatId: string;
  message: string;
  timestamp: Date;
}
