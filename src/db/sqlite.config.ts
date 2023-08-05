import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const SQLITE: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'database.sqlite',
  entities: [__dirname + './../**/*.model{.ts,.js}'],
  synchronize: true,
};
