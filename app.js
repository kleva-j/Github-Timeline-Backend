import cors from 'cors';
import xss from 'xss-clean';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import express, { json } from 'express';

const app = express();

app.enable('trust proxy');
app.use(helmet());
app.use(cors());
app.options('*', cors());
app.use(xss());
app.use(compression());

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(json());

app.all('*', (_req, res) =>
	res.status(200).json({ message: 'Welcome to Github Timeline API.' }),
);

export default app;
