import express, { json } from 'express';
import compression from 'compression';
import xss from 'xss-clean';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import Router from './routes';

const app = express();

app.use(morgan('dev'));
app.enable('trust proxy');
app.use(helmet());
app.use(cors());
app.options('*', cors());
app.use(xss());
app.use(compression());
app.use(json());

app.use(Router);

app.get('*', (_req, res) =>
	res.status(200).send('Welcome to Github Timeline API.'),
);

export default app;
