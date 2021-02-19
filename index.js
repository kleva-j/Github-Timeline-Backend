import 'dotenv/config';
// dotenv.config({ path: path.resolve(__dirname, `../config/${process.env.ENVIRONMENT}.env`)});

import app from './app';

const { log, error } = console;

process.on('uncaughtException', (err) => {
	error('UNCAUGHT EXCEPTION 💥 Shutting down server...');
	error(`${err.name}:`, err);
	process.exit(1);
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
	log(
		`Server is running in ${process.env.NODE_ENV} 🚀 on port ${
			server.address().port
		}`,
	),
);

process.on('unhandledRejection', (err) => {
	error('UNHANDLED REJECTION 💥 Shutting down server...');
	error(`${err.name}:`, err);
	server.close(() => process.exit(1));
});

process.on('SIGTERM', () => {
	log('SIGTERM SIGNAL RECEIVED 👋 Shutting down gracefully...');
	server.close(() => log('💥 Process terminated!'));
});

export default server;
