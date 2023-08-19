import { ChatValueObject } from "./chat.value-object";

test('Crea una instancia válida de ChatValueObject', () => {
  const guestId = 1;
  const hostId = 2;
  const name = 'Ejemplo';

  const chatValueObject = new ChatValueObject({ guestId, hostId, name });

  expect(chatValueObject.uuid).toBeDefined();
  expect(chatValueObject.guestId).toBe(guestId);
  expect(chatValueObject.hostId).toBe(hostId);
  expect(chatValueObject.name).toBe(name);
  expect(chatValueObject.timestamp).toBeInstanceOf(Date);
});

test('Asigna valores por defecto en el constructor', () => {
  const guestId = 1;
  const hostId = 2;
  const name = 'Ejemplo';

  const chatValueObject = new ChatValueObject({ guestId, hostId, name });

  expect(chatValueObject.uuid).toBeDefined();
  expect(chatValueObject.timestamp).toBeInstanceOf(Date);
});

test('Arroja un error con argumentos inválidos', () => {
  const invalidArgs = [
    { guestId: 'invalid', hostId: 2, name: 'Ejemplo' },
    { guestId: 1, hostId: 'invalid', name: 'Ejemplo' },
    // ... más casos de prueba con combinaciones inválidas
  ];

  invalidArgs.forEach((args:any) => {
    expect(() => new ChatValueObject(args)).toThrowError();
  });
});

test('Actualiza el timestamp en nuevas instancias', async () => {
  const guestId = 1;
  const hostId = 2;
  const name = 'Ejemplo';

  const chatValueObject1 = new ChatValueObject({ guestId, hostId, name });
  await new Promise(resolve => setTimeout(resolve, 1000)); // Esperar 1 segundo
  const chatValueObject2 = new ChatValueObject({ guestId, hostId, name });

  expect(chatValueObject2.timestamp.getTime()).toBeGreaterThan(chatValueObject1.timestamp.getTime());
});

test('Genera UUID únicos en diferentes instancias', () => {
  const guestId = 1;
  const hostId = 2;
  const name = 'Ejemplo';

  const chatValueObject1 = new ChatValueObject({ guestId, hostId, name });
  const chatValueObject2 = new ChatValueObject({ guestId, hostId, name });

  expect(chatValueObject1.uuid).not.toBe(chatValueObject2.uuid);
});
