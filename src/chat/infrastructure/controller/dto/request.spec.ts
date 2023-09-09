import { validate } from 'class-validator';
import { CreateChatDto } from './request';

describe('CreateChatDto', () => {
  it('should pass validation with valid data', async () => {
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

  it('should fail validation when guestId is not a valid UUID', async () => {
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

  it('should fail validation when hostId is not a valid UUID', async () => {
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

  it('should fail validation when name is empty', async () => {
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
