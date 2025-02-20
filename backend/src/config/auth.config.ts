import dotenv from 'dotenv';

dotenv.config();

interface AuthConfig {
  refreshTokenExpiryInDays: number;
}

const config: AuthConfig = {
    refreshTokenExpiryInDays: Number(process.env.REFRESH_TOKEN_EXPIRY_DAYS) ?? 7,
};

export default config;