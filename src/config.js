import dotenv from 'dotenv';
dotenv.config();

export const DB_USER = process.env.DB_USER;
export const DB_HOST = process.env.DB_HOST;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_DATABASE = process.env.DB_DATABASE;
export const DB_PORT = 5432;

export const PORT = process.env.PORT || 10001;
