import winston from 'winston';

const { combine, timestamp, prettyPrint, json, errors } = winston.format;

const logger = winston.createLogger({
  level: 'error',
  format: combine(
    errors({ stack: true}),
    json(),
    timestamp(),
    prettyPrint(),
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: `${import.meta.dirname}/../errors/logs` }),
  ],
});

export default logger;
