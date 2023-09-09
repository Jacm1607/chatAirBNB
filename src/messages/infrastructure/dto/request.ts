import { IsUUID, IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty() // Valida que no esté vacío
  guestId: string;

  @IsNotEmpty() // Valida que no esté vacío
  hostId: string;

  @IsNotEmpty() // Valida que no esté vacío
  chatId: string;

  @IsString() // Valida que sea una cadena de texto
  @IsNotEmpty() // Valida que no esté vacío
  message: string;
}
