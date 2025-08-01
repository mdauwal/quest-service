import { DataSource } from 'typeorm';

function mustGetEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value;
}

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: mustGetEnv('DB_HOST'),
  port: parseInt(mustGetEnv('DB_PORT'), 10),
  username: mustGetEnv('DB_USER'),
  password: mustGetEnv('DB_PASSWORD'),
  database: mustGetEnv('DB_NAME'),
  entities: [
    'dist/**/*.entity.js',
    'src/**/*.entity.ts'  // For development
  ],
  migrations: [
    'dist/migrations/*.js',
    'src/migrations/*.ts'  // For development
  ],
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
  dropSchema: false,
  migrationsRun: false,
});
