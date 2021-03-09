import { graphqlHTTP } from 'express-graphql';
import express, { json } from 'express';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import compression from 'compression';
import xss from 'xss-clean';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';

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
	.use(express.static(path.join(__dirname, 'build')))
	.use(
		session({
			name: 'Gitline-sid',
			secret: process.env.AUTH_SECRET,
			saveUninitialized: false,
			resave: false,
			store: MongoStore.create({
				mongoUrl: process.env.MONGODB_CONNECT_STORE,
				mongoOptions: {
					useNewUrlParser: true,
					useUnifiedTopology: true,
				},
			}),
			cookie: {
				maxAge:  8 * 3600 * 1000,
				sameSite: 'strict',
				secure: process.env.NODE_ENV === 'production',
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
		res.sendFile(path.join(__dirname, 'build', 'index.html')),
	);

export default app;
