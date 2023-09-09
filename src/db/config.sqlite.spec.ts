import { SQLITE } from './sqlite.config';

jest.useFakeTimers();
describe('SQLITE', () => {
  it('should have the correct type', () => {
    expect(SQLITE).toHaveProperty('type', 'sqlite');
  });

  it('should have the correct database name', () => {
    expect(SQLITE).toHaveProperty('database', 'database.sqlite');
  });

  it('should have entities defined', () => {
    expect(SQLITE).toHaveProperty('entities');
    expect(SQLITE.entities).toHaveLength(1); // Ajusta el número según la cantidad de entidades esperadas
  });

  it('should have synchronize set to true', () => {
    expect(SQLITE).toHaveProperty('synchronize', true);
  });

  // Puedes agregar más pruebas para otras propiedades si es necesario
});
