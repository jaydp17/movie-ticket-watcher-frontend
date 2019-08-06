export enum Environment {
  development = 'development',
  staging = 'staging',
  production = 'production',
}
export const env = (process.env.NODE_ENV || Environment.development) as Environment;
export const isDev = env === Environment.development;
export const isStaging = env === Environment.staging;
export const isProd = env === Environment.production;

export const serverBaseURL = (() => {
  if (isDev) return 'http://localhost:3000';
  if (isStaging) return 'https://staging-api.movie-ticket-watcher.jaydp.com';
  if (isProd) return 'https://api.movie-ticket-watcher.jaydp.com';
  throw new Error('Invalid NODE_ENV');
})();
