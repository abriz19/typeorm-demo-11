import 'reflect-metadata';
import { User } from 'src/auth/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

export const commonConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  logging: true,
  entities: [User],
  migrations: ['dist/migrations/*.js'],
};

export const typeOrmConfig = commonConfig;

export const AppDataSource = new DataSource(commonConfig);
