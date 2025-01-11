import pino from 'pino';

const Logger = pino({
  enabled: true,
  transport: {
    target: 'pino-pretty',
  },
});

export { Logger };
