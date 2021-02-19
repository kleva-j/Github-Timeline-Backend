export * from './auth.spec';
export * from './util.spec';
export * from './app.spec';

process.env.NODE_ENV = 'test';
process.env.GITHUB_CLIENT_ID = 'GITHUB_CLIENT_ID';
process.env.GITHUB_CLIENT_SECRET = 'GITHUB_CLIENT_SECRET';
