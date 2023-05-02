import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'secret_db',
  synchronize: true,
  logging: true,
  entities: [__dirname + '/entities/*.ts'],
  subscribers: [],
  migrations: [],
});
