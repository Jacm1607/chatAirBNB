import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const MYSQL: TypeOrmModuleOptions = {
	type: 'mysql',
	host: 'mysql',
	port: 3306,
	username: 'root',
	password: 'password',
	database: 'io-chat',
	entities: [__dirname + './../**/*.model{.ts,.js}'],
	synchronize: true,
};
