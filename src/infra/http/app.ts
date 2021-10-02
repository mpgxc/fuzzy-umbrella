import 'reflect-metadata';
import 'express-async-errors';
import '@shared/container';

import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { routes } from 'presenter/routes';

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use('/api', routes);

export { app };
