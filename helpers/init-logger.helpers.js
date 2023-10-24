const {
  config,
  createLogger,
  format,
  transports,
  addColors,
} = require('winston');
const { combine, colorize, label, timestamp, printf, splat } = format;
const winstonGelf = require('winston-gelf');
require('dotenv').config();

addColors({
  emerg: 'underline magenta',
  alert: 'underline magenta',
  crit: 'underline magenta', // used for tools errors (mongo, rabbitmq)
  error: 'bold red', // only used for http errors (error handling)
  warning: 'bold yellow', // used for minor errors (lowest level of errors)
  notice: 'bold blue', // used for http requests (streaming with morgan)
  info: 'green', // used for informations
  debug: 'white', // extra informations and details
});

const consleFormat = combine(
  splat(),
  colorize({ all: true }),
  label({ label: '[LOGGER]' }),
  timestamp({ format: 'isoDateTime' }),
  printf(
    item => `${item.label} ${item.timestamp} ${item.level} : ${item.message}`,
  ),
);

const consoleOptions = {
  level: 'info',
  format: consleFormat,
  handleExceptions: true,
  json: false,
};

const graylogFormat = combine(splat(), timestamp({ format: 'isoDateTime' }));

const graylogOptions = {
  level: 'debug',
  format: graylogFormat,
  gelfPro: {
    fields: {
      service: process.env.GRAYLOG_SERVICE,
      env: process.env.NODE_ENV || 'Production',
    },
    adapterName: 'tcp',
    adapterOptions: {
      host: process.env.GRAYLOG_HOST,
      port: process.env.GRAYLOG_PORT,
    },
  },
};

const logger = createLogger({
  levels: config.syslog.levels,
  transports: [
    new transports.Console(consoleOptions),
    new winstonGelf(graylogOptions),
  ],
  exitOnError: false,
});

logger.stream = {
  write: function (message, encoding) {
    logger.notice(message.trim());
  },
};

module.exports = logger;
