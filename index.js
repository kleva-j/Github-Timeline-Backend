import 'dotenv/config';

import app from './app';

const { log, error } = console;

process.on('uncaughtException', (err) => {
	error('UNCAUGHT EXCEPTION 💥 Shutting down server...');
	error(`${err.name}:`, err);
	process.exit(1);
});

const { listen } = app;

const port = process.env.PORT || 3000;
const server = listen(port, () => log('Server is running 🚀'));

process.on('unhandledRejection', (err) => {
	error('UNHANDLED REJECTION 💥 Shutting down server...');
	error(`${err.name}:`, err);
	server.close(() => process.exit(1));
});

process.on('SIGTERM', () => {
	log('SIGTERM SIGNAL RECEIVED 👋 Shutting down gracefully...');
	server.close(() => log('💥 Process terminated!'));
});
