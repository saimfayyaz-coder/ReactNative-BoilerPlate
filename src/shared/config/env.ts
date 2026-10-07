import Config from 'react-native-config';

export const config = {
  appEnv: Config.APP_ENV || 'development',
  appName: Config.APP_NAME || 'BoilerplateApp',
  apiUrl: Config.API_URL || 'http://172.16.5.84:5000/api',
  applicationId: Config.APPLICATION_ID || 'com.boilerplateapp',
  isDev: (Config.APP_ENV || 'development') === 'development',
  isStage: Config.APP_ENV === 'staging',
  isProd: Config.APP_ENV === 'production',
};

export const BASE_URL = config.apiUrl;

export const ENV = {
  API_BASE_URL: config.apiUrl,
};

export default config;
