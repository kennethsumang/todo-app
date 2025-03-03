interface AppConfig {
  appUrl: string;
  apiUrl: string;
}

const config: AppConfig = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "",
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "",
};

export default config;
