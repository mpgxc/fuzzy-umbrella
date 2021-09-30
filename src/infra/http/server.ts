import { Logger } from '@infra/Logger';
import 'dotenv/config';

import { app } from './app';

const { API_PORT } = process.env;

app.listen(API_PORT, () => {
  Logger.info(`🚀 Servidor rodando! http://localhost:${API_PORT}/api`);
});
