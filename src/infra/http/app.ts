import 'reflect-metadata';
import 'express-async-errors';
import '@shared/container';

import { RouteNotFound } from '@presenter/middlewares/RouteNotFound';
import { routes } from '@presenter/routes';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { CelebrateExceptionHandler } from '@shared/excpetions';

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use('/api', routes);
app.use(RouteNotFound.handle);
app.use(CelebrateExceptionHandler.handle);

export { app };
