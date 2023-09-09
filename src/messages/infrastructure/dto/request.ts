import { IsUUID, IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsUUID() // Valida que sea un UUID válido
  @IsNotEmpty() // Valida que no esté vacío
  guestId: string;

  @IsUUID() // Valida que sea un UUID válido
  @IsNotEmpty() // Valida que no esté vacío
  hostId: string;

  @IsUUID() // Valida que sea un UUID válido
  @IsNotEmpty() // Valida que no esté vacío
  chatId: string;

  @IsString() // Valida que sea una cadena de texto
  @IsNotEmpty() // Valida que no esté vacío
  message: string;
}
