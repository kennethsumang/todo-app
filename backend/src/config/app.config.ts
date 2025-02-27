import dotenv from 'dotenv';

dotenv.config();

interface AppConfig {
  port: number;
  frontendUrl: string;
}

const config: AppConfig = {
  port: Number(process.env.PORT) || 3000,
  frontendUrl: process.env.FRONTEND_URL ?? '',
};

export default config;