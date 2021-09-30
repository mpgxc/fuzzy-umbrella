import pino from 'pino';

const Logger = pino({
  enabled: true,
  prettyPrint: { colorize: true },
});

export { Logger };
