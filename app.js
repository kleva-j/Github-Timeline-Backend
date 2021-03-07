import { graphqlHTTP } from 'express-graphql';
import express, { json } from 'express';
import session from 'express-session';
import compression from 'compression';
import xss from 'xss-clean';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import Router from './routes';
import graphqlSchema from './graphql/schema';
import * as graphqlResolvers from './graphql/resolvers';

const app = express();

app
	.use(morgan('combined'))
	.enable('trust proxy')
	.use(helmet())
	.use(cors())
	.options('*', cors())
	.use(xss())
	.use(
		session({
			name: 'Gitline-sid',
			secret: process.env.AUTH_SECRET,
			saveUninitialized: false,
			resave: false,
			cookie: {
				maxAge: 8 * 3600,
				sameSite: 'strict',
			},
		}),
	)
	.use(compression())
	.use(json())
	.use(Router)
	.use(
		'/graphql',
		graphqlHTTP({
			schema: graphqlSchema,
			rootValue: graphqlResolvers,
			graphiql: true,
		}),
	)
	.get('*', (_req, res) =>
		res.status(200).send('Welcome to Github Timeline API.'),
	);

export default app;
