import { config } from 'dotenv';

config({ path: '../env.test' });

export * from './app.spec';
export * from './util.spec';
export * from './auth.spec';
export * from './graphql/index.spec';
