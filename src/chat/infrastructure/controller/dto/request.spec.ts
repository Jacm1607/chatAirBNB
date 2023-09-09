import { validate } from 'class-validator';
import { CreateChatDto } from './request';

describe('CreateChatDto', () => {
  it('debe pasar la validación con datos válidos', async () => {
    const validData = {
      guestId: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
      hostId: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
      name: 'Test Chat',
    };

    const createChatDto = new CreateChatDto();
    Object.assign(createChatDto, validData);

    const errors = await validate(createChatDto);
    await expect(errors.length).toBe(0);
  });

  it('debe validar cuando guestId no es un UUID válido', async () => {
    const invalidData = {
      guestId: 'invalid-uuid',
      hostId: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
      name: 'Test Chat',
    };

    const createChatDto = new CreateChatDto();
    Object.assign(createChatDto, invalidData);

    const errors = await validate(createChatDto);
    await expect(errors.length).toBeGreaterThan(0);
  });

  it('debe validar cuando hostId no es un UUID válido', async () => {
    const invalidData = {
      guestId: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
      hostId: 'invalid-uuid',
      name: 'Test Chat',
    };

    const createChatDto = new CreateChatDto();
    Object.assign(createChatDto, invalidData);

    const errors = await validate(createChatDto);
    await expect(errors.length).toBeGreaterThan(0);
  });

  it('debe validar cuando el nombre está vacío', async () => {
    const invalidData = {
      guestId: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
      hostId: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
      name: '',
    };

    const createChatDto = new CreateChatDto();
    Object.assign(createChatDto, invalidData);

    const errors = await validate(createChatDto);
    await expect(errors.length).toBeGreaterThan(0);
  });
});
