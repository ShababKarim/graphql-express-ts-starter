import winston from 'winston';

const logConfiguration = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.colorize({
            all: true
        }),
        winston.format.label({
            label: '[LOGGER]'
        }),
        winston.format.timestamp({
            format: 'MM-DD-YYYY HH:mm:ss'
        }),
        winston.format.printf(info => `[${info.level} ${info.timestamp}]: ${info.message}`),
    )
}

const logger = winston.createLogger(logConfiguration);

export default logger;